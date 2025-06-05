// components/TimerList.js
import React from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import Timer from './Timer';

export default function TimerList({
  timers,
  isLandscape,
  activeTimerId,
  globalMode,
  sequentialStatus,
  onDelete,
  onActivate,
  onComplete,
}) {
  const { width } = useWindowDimensions();
  const cardWidth = width / 3.2;
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.gridWrapper}>
        {timers.map(timer => (
          <View
            key={timer.id}
            style={[styles.timerWrapper, { width: cardWidth }]}
          >
            <Timer
              id={timer.id}
              initialTime={timer.time}
              onDelete={onDelete}
              onActivate={onActivate}
              onTimerComplete={onComplete}
              isActive={
                globalMode === 'sequential'
                  ? activeTimerId === timer.id
                  : globalMode === 'simultaneous'
                    ? sequentialStatus === 'running'
                    : false
              }
              mode={globalMode}
              status={sequentialStatus}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  gridWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  timerWrapper: {
    marginBottom: 16,
    paddingHorizontal: 6,
  },
});

