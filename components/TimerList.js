// components/TimerList.js
import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, useWindowDimensions, StyleSheet } from 'react-native';
import Timer from './Timer';

const TimerList = () => {
  const [timers, setTimers] = useState([1]);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const addTimer = () => {
    setTimers(prev => [...prev, prev.length + 1]);
  };

  const deleteTimer = (id) => {
    setTimers(prev => prev.filter(timerId => timerId !== id));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          isLandscape && styles.scrollContainerLandscape
        ]}
      >
        {timers.map(id => (
          <View
            key={id}
            style={[styles.timerWrapper, isLandscape && styles.timerWrapperLandscape]}
          >
            <Timer id={id} onDelete={deleteTimer} />
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={addTimer}>
        <Text style={styles.addButtonText}>+ Add Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TimerList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20,
  },
  scrollContainerLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  timerWrapper: {
    width: '90%',
  },
  timerWrapperLandscape: {
    width: '45%',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
