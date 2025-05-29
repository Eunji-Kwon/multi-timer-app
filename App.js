// App.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar, ScrollView, useWindowDimensions } from 'react-native';
import Timer from './components/Timer';

export default function App() {
  const [timers, setTimers] = useState([
    { id: 1, time: 5 },
    { id: 2, time: 5 },
    { id: 3, time: 5 }
  ]);
  const [activeTimerId, setActiveTimerId] = useState(null);
  const [globalMode, setGlobalMode] = useState('manual');
  //const [isSequentialRunning, setIsSequentialRunning] = useState(false);
const [sequentialStatus, setSequentialStatus] = useState('idle');

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const addTimer = () => {
    if (timers.length < 6) {
      setTimers([...timers, { id: timers.length + 1, time: 5 }]);
    }
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  // const handleGlobalStart = () => {
  //   if (globalMode === 'sequential') {
  //     setIsSequentialRunning(true);
  //     setActiveTimerId(timers[0].id);
  //   } else if (globalMode === 'simultaneous') {
  //     setIsSequentialRunning(true);
  //     setActiveTimerId(timers[0].id);
  //   }
  // };

  // Toggle between start, pause, and resume for sequential mode

  const handleGlobalStart = () => {
  if (globalMode === 'sequential') {
    if (sequentialStatus === 'idle') {
      setSequentialStatus('running');
      setActiveTimerId(timers[0].id);
    } else if (sequentialStatus === 'running') {
      setSequentialStatus('paused');
    } else if (sequentialStatus === 'paused') {
      setSequentialStatus('running');
    }
  }
};


  const handleTimerComplete = (id) => {
    if (globalMode === 'sequential') {
      const currentIndex = timers.findIndex(timer => timer.id === id);
      if (currentIndex < timers.length - 1) {
        setActiveTimerId(timers[currentIndex + 1].id);
      } else {
        setActiveTimerId(null);
        //setIsSequentialRunning(false);
        setSequentialStatus('idle');

      }
    }
  };

  const handleTimerActivate = (id) => {
    if (globalMode === 'simultaneous') {
      setActiveTimerId(id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

{/* Main horizontal layout: Favorites on the left, timers on the right */}
      <View style={styles.mainRow}>

        {/* Left-side favorites column */}
    <View style={styles.favoritesWrapper}>
  <ScrollView contentContainerStyle={styles.favoritesContainer}>
    {[...Array(9)].map((_, index) => (
      <TouchableOpacity key={index} style={styles.favoriteSlot}>
        <Text style={styles.favoriteText}>{index + 1}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>

        {/* Timer area: header, scrollable timers, and mode tabs */}
        <View style={styles.timerArea}>
          <View style={styles.header}>
            <Text style={styles.title}>Multi Timer</Text>
            <View style={styles.headerButtons}>
              {(globalMode === 'sequential' || globalMode === 'simultaneous') && (
                <TouchableOpacity 
                  style={[
                    styles.globalStartButton,
                    sequentialStatus === 'running' && styles.globalStartButtonRunning,
                    sequentialStatus === 'paused' && styles.globalStartButtonPaused
                  ]}
                  onPress={handleGlobalStart}
                >
                  <Text style={styles.globalStartButtonText}>
                    {sequentialStatus === 'running' ? 'Pause' :
                    sequentialStatus === 'paused' ? 'Resume' :
                    'Start Sequential'}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
                style={[styles.addButton, timers.length >= 6 && styles.addButtonDisabled]}
                onPress={addTimer}
                disabled={timers.length >= 6}  // Disable if 6 timers already exist
              >
                <Text style={styles.addButtonText}>+ Add Timer</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.timerContainer} horizontal={false}>
            <View style={[styles.gridWrapper, isLandscape && styles.gridLandscape]}>
              {timers.map(timer => (
                <Timer
                  key={timer.id}
                  id={timer.id}
                  onDelete={deleteTimer}
                  isActive={activeTimerId === timer.id}
                  onTimerComplete={handleTimerComplete}
                  onActivate={handleTimerActivate}
                  mode={globalMode}
                  initialTime={timer.time}
                  status={sequentialStatus} 
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.tabContainer}>
            {['sequential', 'simultaneous', 'manual'].map(mode => (
              <TouchableOpacity
                key={mode}
                style={[styles.tabButton, globalMode === mode && styles.tabButtonActive]}
                onPress={() => {
                  setGlobalMode(mode);
                  setSequentialStatus('idle');
                  setActiveTimerId(null);
                }}
              >
                <Text style={styles.tabButtonText}>{mode.charAt(0).toUpperCase() + mode.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  mainRow: { flex: 1, flexDirection: 'row' },
favoritesWrapper: {
  width: '10%', // takes up exactly 10% of the row
  backgroundColor: '#ffffff',
  borderRightWidth: 1,
  borderRightColor: '#e0e0e0',
},

favoritesContainer: {
  alignItems: 'center',
  paddingVertical: 20,
},


 favoriteSlot: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: '#eaeaea',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 8,
  borderWidth: 1,
  borderColor: '#bbb',
},
favoriteText: {
  fontSize: 16,
  color: '#333',
  fontWeight: 'bold'
},

  timerArea: { flex: 1 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20,
    borderBottomWidth: 1, borderBottomColor: '#e0e0e0'
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  headerButtons: { flexDirection: 'row', gap: 10 },
  globalStartButton: {
    backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 20
  },
  globalStartButtonRunning: { backgroundColor: '#34C759' },
  globalStartButtonText: { color: '#fff', fontWeight: 'bold' },
  globalStartButtonPaused: { backgroundColor: '#FF9500' },
  addButton: {
    backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20
  },
  addButtonDisabled: { backgroundColor: '#ccc' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  timerContainer: { padding: 20 },
  gridWrapper: {
    flexDirection: 'column',
    gap: 16,
  },
  gridLandscape: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tabContainer: {
    flexDirection: 'row', justifyContent: 'space-around', padding: 10,
    borderTopWidth: 1, borderTopColor: '#e0e0e0', backgroundColor: '#ffffff'
  },
  tabButton: {
    paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10,
    backgroundColor: '#f0f0f0'
  },
  tabButtonActive: {
    backgroundColor: '#FF9500'
  },
  tabButtonText: {
    fontWeight: 'bold', color: '#333'
  },
});
