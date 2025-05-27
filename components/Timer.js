import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { timerStyles } from '../styles/TimerStyles';

const Timer = ({ 
  id, 
  onDelete, 
  isDarkMode, 
  mode = 'manual',
  onTimerComplete,
  isActive = false,
  onActivate
}) => {
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('05');
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(5);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            setIsFinished(true);
            onTimerComplete?.(id);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, totalSeconds, id, onTimerComplete]);

  useEffect(() => {
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;
    setTotalSeconds(mins * 60 + secs);
  }, [minutes, seconds]);

  useEffect(() => {
    if (isActive && mode === 'sequential' && !isRunning && !isFinished) {
      setIsRunning(true);
    }
  }, [isActive, mode]);

  const handleStartStop = () => {
    if (isFinished) {
      setMinutes('00');
      setSeconds('05');
      setIsFinished(false);
      setIsPaused(false);
    } else if (isRunning) {
      setIsPaused(!isPaused);
    } else {
      if (mode === 'manual') {
        setIsRunning(true);
        setIsPaused(false);
      } else if (mode === 'simultaneous') {
        setIsRunning(true);
        setIsPaused(false);
        onActivate?.(id);
      }
    }
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (text, type) => {
    const num = text.replace(/[^0-9]/g, '');
    if (type === 'minutes') {
      setMinutes(num.padStart(2, '0').slice(0, 2));
    } else {
      setSeconds(num.padStart(2, '0').slice(0, 2));
    }
  };

  const getButtonText = () => {
    if (isFinished) return 'Restart';
    if (!isRunning) return 'Start';
    return isPaused ? 'Resume' : 'Pause';
  };

  const isLandscape = dimensions.width > dimensions.height;
  const containerStyle = {
    ...timerStyles.container,
    backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
    width: isLandscape ? dimensions.width * 0.4 : dimensions.width * 0.8,
  };

  return (
    <View style={containerStyle}>
      <View style={timerStyles.header}>
        <Text style={[
          timerStyles.timerTitle,
          { color: isDarkMode ? '#ffffff' : '#333333' }
        ]}>Timer {id}</Text>
        <TouchableOpacity onPress={() => onDelete(id)} style={timerStyles.deleteButton}>
          <Text style={timerStyles.deleteButtonText}>×</Text>
        </TouchableOpacity>
      </View>
      
      {!isRunning && !isFinished ? (
        <View style={timerStyles.timeInputContainer}>
          <TextInput
            style={[
              timerStyles.timeInput,
              { color: isDarkMode ? '#ffffff' : '#000000' }
            ]}
            value={minutes}
            onChangeText={(text) => handleTimeChange(text, 'minutes')}
            keyboardType="number-pad"
            maxLength={2}
            placeholderTextColor={isDarkMode ? '#666666' : '#999999'}
          />
          <Text style={[
            timerStyles.timeSeparator,
            { color: isDarkMode ? '#ffffff' : '#000000' }
          ]}>:</Text>
          <TextInput
            style={[
              timerStyles.timeInput,
              { color: isDarkMode ? '#ffffff' : '#000000' }
            ]}
            value={seconds}
            onChangeText={(text) => handleTimeChange(text, 'seconds')}
            keyboardType="number-pad"
            maxLength={2}
            placeholderTextColor={isDarkMode ? '#666666' : '#999999'}
          />
        </View>
      ) : (
        <Text style={[
          timerStyles.timerText,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}>{formatTime(totalSeconds)}</Text>
      )}

      <View style={timerStyles.buttonContainer}>
        <TouchableOpacity 
          style={[
            timerStyles.button,
            isRunning && !isPaused && timerStyles.buttonRunning,
            isFinished && timerStyles.buttonReset,
            isPaused && timerStyles.buttonPaused
          ]} 
          onPress={handleStartStop}
        >
          <Text style={timerStyles.buttonText}>
            {getButtonText()}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer; 