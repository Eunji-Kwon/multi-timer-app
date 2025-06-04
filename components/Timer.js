// components/Timer.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { timerStyles } from '../styles/TimerStyle';

// status = 'idle' | 'running' | 'paused'
const Timer = ({ 
  id, 
  onDelete,
  mode = 'manual',
  onTimerComplete,
  isActive = false,
  onActivate,
  initialTime = 5,
  status 
}) => {
  const [minutes, setMinutes] = useState(Math.floor(initialTime / 60).toString().padStart(2, '0'));
  const [seconds, setSeconds] = useState((initialTime % 60).toString().padStart(2, '0'));
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(initialTime);
  const initialTimeRef = useRef(initialTime);



useEffect(() => {
  let interval;
  if (isRunning && !isPaused && totalSeconds > 0) {
    interval = setInterval(() => {
      setTotalSeconds((prevTime) => {
        if (prevTime <= 1) {
          setIsRunning(false);
          setIsPaused(false);
          setIsFinished(true);
          
          setTimeout(() => {
            onTimerComplete?.(id);
          }, 0);

          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }
  return () => clearInterval(interval);
}, [isRunning, isPaused, totalSeconds]);


  useEffect(() => {
    const mins = parseInt(minutes) || 0;
    const secs = parseInt(seconds) || 0;
    const newTotalSeconds = mins * 60 + secs;
    setTotalSeconds(newTotalSeconds);
    initialTimeRef.current = newTotalSeconds;
  }, [minutes, seconds]);


  
  useEffect(() => {
  if (mode === 'sequential' && isActive) {
    if (status === 'running') {
      if (!isRunning && !isFinished) {
        setIsRunning(true);
        setIsPaused(false);
      } else if (isRunning && isPaused) {

        setIsPaused(false);
      }
    } else if (status === 'paused' && isRunning && !isPaused) {
      setIsPaused(true);
    }
  }
}, [status, isActive, mode, isRunning, isPaused, isFinished]);


useEffect(() => {
  if (mode === 'simultaneous' && status === 'running') {
    if (!isRunning && !isFinished) {
      setIsRunning(true);
      setIsPaused(false);
    } else if (isRunning && isPaused) {
      setIsPaused(false);
    }
  } else if (mode === 'simultaneous' && status === 'paused') {
    if (isRunning && !isPaused) {
      setIsPaused(true);
    }
  }
}, [mode, status, isRunning, isPaused, isFinished]);

  const handleStartStop = () => {
    if (isFinished) {
      setMinutes(Math.floor(initialTimeRef.current / 60).toString().padStart(2, '0'));
      setSeconds((initialTimeRef.current % 60).toString().padStart(2, '0'));
      setIsFinished(false);
      setIsPaused(false);
      setTotalSeconds(initialTimeRef.current);
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

  const handleReset = () => {
    setMinutes(Math.floor(initialTimeRef.current / 60).toString().padStart(2, '0'));
    setSeconds((initialTimeRef.current % 60).toString().padStart(2, '0'));
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    setTotalSeconds(initialTimeRef.current);
  };

  const handleTimeChange = (text, type) => {
    const num = text.replace(/[^0-9]/g, '');
    if (type === 'minutes') {
      setMinutes(num.padStart(2, '0').slice(0, 2));
    } else {
      setSeconds(num.padStart(2, '0').slice(0, 2));
    }
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getButtonText = () => {
    if (isFinished) return 'Restart';
    if (!isRunning) return 'Start';
    return isPaused ? 'Resume' : 'Pause';
  };

  return (
    <View style={timerStyles.container}>
      <View style={timerStyles.header}>
        <Text style={timerStyles.title}>Timer {id}</Text>
        <View style={timerStyles.headerButtons}>
          <TouchableOpacity onPress={handleReset} style={timerStyles.iconButton}>
            <Text style={timerStyles.iconText}>↺</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(id)} style={timerStyles.iconButton}>
            <Text style={timerStyles.iconText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>

      {!isRunning && !isFinished ? (
        <View style={timerStyles.timeInputContainer}>
          <TextInput
            style={timerStyles.timeInput}
            value={minutes}
            onChangeText={(text) => handleTimeChange(text, 'minutes')}
            keyboardType="number-pad"
            maxLength={2}
            placeholder="00"
          />
          <Text style={timerStyles.timeSeparator}>:</Text>
          <TextInput
            style={timerStyles.timeInput}
            value={seconds}
            onChangeText={(text) => handleTimeChange(text, 'seconds')}
            keyboardType="number-pad"
            maxLength={2}
            placeholder="00"
          />
        </View>
      ) : (
        <Text style={timerStyles.timerText}>{formatTime(totalSeconds)}</Text>
      )}

  

      {mode === 'manual' && (
  <TouchableOpacity style={timerStyles.controlButton} onPress={handleStartStop}>
    <Text style={timerStyles.controlButtonText}>{getButtonText()}</Text>
  </TouchableOpacity>
)}
{mode === 'simultaneous' && (
  <Text style={[timerStyles.controlButtonText, { opacity: 0.4 }]}>
    Controlled by Group
  </Text>
)}
{mode === 'sequential' && (
  <Text style={[timerStyles.controlButtonText, { opacity: 0.4 }]}>
    Sequential Mode
  </Text>
)}

    </View>
  );
};

export default Timer;
