// App.js
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar, ScrollView, useWindowDimensions } from 'react-native';
import Timer from './components/Timer';
import TimerList from './components/TimerList'; 
import FavoritesPanel from './components/FavoritesPanel';


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

 
  // Toggle between start, pause, and resume for sequential mode
const handleGlobalStart = () => {
  if (globalMode === 'sequential') {
    if (sequentialStatus === 'idle') {
      setSequentialStatus('running');
      setActiveTimerId(timers[0].id); // Activate the first timer
    } else if (sequentialStatus === 'running') {
      setSequentialStatus('paused');
    } else if (sequentialStatus === 'paused') {
      setSequentialStatus('running');
    }
  } else if (globalMode === 'simultaneous') {
    if (sequentialStatus === 'idle' || sequentialStatus === 'paused') {
      setSequentialStatus('running');
      setActiveTimerId(null); 

      timers.forEach(timer => {
        handleTimerActivate(timer.id); 
      });
    } else if (sequentialStatus === 'running') {
      setSequentialStatus('paused');
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

  const [favorites, setFavorites] = useState(Array(9).fill(null));



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

{/* Main horizontal layout: Favorites on the left, timers on the right */}
      <View style={styles.mainRow}>

        {/* Left-side favorites column */}
        <FavoritesPanel 
          favorites={favorites}
          onLoadSlot={(index) => {
            const fav = favorites[index];
            if (fav) {
              setTimers(fav);
            }
          }}
          onSaveSlot={(index) => {
            const newFavorites = [...favorites];
            newFavorites[index] = timers;
            setFavorites(newFavorites);
          }}
          onDeleteSlot={(index) => {
            const newFavorites = [...favorites];
            //newFavorites[index] = null;
              newFavorites[index] = timers.map(t => ({ id: t.id, time: t.time }));

            setFavorites(newFavorites);
          }}
        />

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
                {globalMode === 'sequential' ? (
                  sequentialStatus === 'running' ? 'Pause' :
                  sequentialStatus === 'paused' ? 'Resume' :
                  'Start Sequential'
                ) : (
                  'Start All Timers'
                )}
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

     
            <TimerList
    timers={timers}
    isLandscape={isLandscape}
    activeTimerId={activeTimerId}
    globalMode={globalMode}
    sequentialStatus={sequentialStatus}
    onDelete={deleteTimer}
    onActivate={handleTimerActivate}
    onComplete={handleTimerComplete}
  />


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
  width: '10%', 
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
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
},
timerCard: {
  width: '25%', // 3 cards per row
  marginBottom: 20,
  
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
