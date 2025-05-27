import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Dimensions } from 'react-native';
import Timer from './Timer';
import { timerListStyles } from '../styles/TimerListStyles';

const TimerList = ({ isDarkMode, isLandscape }) => {
  const [timers, setTimers] = useState([1]); // Initial timer
  const windowWidth = Dimensions.get('window').width;

  const addTimer = () => {
    setTimers(prev => [...prev, prev.length + 1]);
  };

  const deleteTimer = (id) => {
    setTimers(prev => prev.filter(timerId => timerId !== id));
  };

  return (
    <View style={[
      timerListStyles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }
    ]}>
      <ScrollView 
        style={timerListStyles.scrollView}
        contentContainerStyle={[
          timerListStyles.scrollContent,
          isLandscape && {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            padding: 10,
          }
        ]}
      >
        {timers.map(id => (
          <View 
            key={id} 
            style={[
              timerListStyles.timerWrapper,
              isLandscape && {
                width: (windowWidth - 40) / 2,
                margin: 5,
              }
            ]}
          >
            <Timer 
              id={id} 
              onDelete={deleteTimer}
              isDarkMode={isDarkMode}
            />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity 
        style={[
          timerListStyles.addButton,
          { backgroundColor: isDarkMode ? '#2a2a2a' : '#007AFF' }
        ]} 
        onPress={addTimer}
      >
        <Text style={[
          timerListStyles.addButtonText,
          { color: isDarkMode ? '#ffffff' : '#ffffff' }
        ]}>+ Add Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerList; 