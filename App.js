import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar, useColorScheme, Dimensions, ScrollView } from 'react-native';
import Timer from './components/Timer';

export default function App() {
  const [timers, setTimers] = useState([{ id: 1 }]);
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');
  const [isTablet, setIsTablet] = useState(false);
  const [activeTimerId, setActiveTimerId] = useState(null);
  const [globalMode, setGlobalMode] = useState('manual'); // 'manual', 'sequential', 'simultaneous'

  useEffect(() => {
    const checkDeviceType = () => {
      const { width, height } = Dimensions.get('window');
      // 일반적인 태블릿 기준: 768dp 이상
      setIsTablet(width >= 768);
    };

    checkDeviceType();
    const subscription = Dimensions.addEventListener('change', checkDeviceType);

    return () => subscription?.remove();
  }, []);

  const addTimer = () => {
    if (timers.length < 6) {
      setTimers([...timers, { id: timers.length + 1 }]);
    }
  };

  const deleteTimer = (id) => {
    setTimers(timers.filter(timer => timer.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTimerComplete = (id) => {
    const currentIndex = timers.findIndex(timer => timer.id === id);
    if (currentIndex < timers.length - 1) {
      setActiveTimerId(timers[currentIndex + 1].id);
    } else {
      setActiveTimerId(null);
    }
  };

  const handleTimerActivate = (id) => {
    setActiveTimerId(id);
  };

  const getGridStyle = () => {
    const numTimers = timers.length;
    if (numTimers === 1) {
      return styles.singleTimerGrid;
    } else if (numTimers <= 3) {
      return styles.twoColumnGrid;
    } else {
      return styles.threeColumnGrid;
    }
  };

  return (
    <SafeAreaView style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#000000' : '#f5f5f5' }
    ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={[
          styles.title,
          { color: isDarkMode ? '#ffffff' : '#333333' }
        ]}>
          Multi Timer
        </Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={[
              styles.addButton,
              timers.length >= 6 && styles.addButtonDisabled
            ]}
            onPress={addTimer}
            disabled={timers.length >= 6}
          >
            <Text style={[
              styles.addButtonText,
              timers.length >= 6 && styles.addButtonTextDisabled
            ]}>
              + Add Timer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDarkMode} style={styles.headerButton}>
            <Text style={[
              styles.headerButtonText,
              { color: isDarkMode ? '#ffffff' : '#333333' }
            ]}>
              {isDarkMode ? '☾' : '☽'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      
      <View style={styles.mainContent}>
        <View style={styles.favoriteSpace}>
          {/* 즐겨찾기 공간 */}
        </View>
        <ScrollView 
          style={styles.content}
          contentContainerStyle={[
            styles.timerContainer,
            getGridStyle()
          ]}
          showsVerticalScrollIndicator={false}
        >
          {timers.map(timer => (
            <Timer
              key={timer.id}
              id={timer.id}
              onDelete={deleteTimer}
              isDarkMode={isDarkMode}
              isActive={activeTimerId === timer.id}
              onTimerComplete={handleTimerComplete}
              onActivate={handleTimerActivate}
              mode={globalMode}
            />
          ))}
        </ScrollView>

      </View>
      <View style={[
        styles.tabContainer,
        { backgroundColor: isDarkMode ? '#1a1a1a' : '#f8f8f8' }
      ]}>
       
        <TouchableOpacity 
          style={[
            styles.tabButton,
            globalMode === 'sequential' && styles.tabButtonActive,
            { backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff' }
          ]}
          onPress={() => setGlobalMode('sequential')}
        >
          <Text style={[
            styles.tabButtonText,
            { color: isDarkMode ? '#ffffff' : '#333333' },
            globalMode === 'sequential' && styles.tabButtonTextActive
          ]}>Sequential</Text>
          <Text style={styles.tabButtonDescription}>
          Start one after the other
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            globalMode === 'simultaneous' && styles.tabButtonActive,
            { backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff' }
          ]}
          onPress={() => setGlobalMode('simultaneous')}
        >
          <Text style={[
            styles.tabButtonText,
            { color: isDarkMode ? '#ffffff' : '#333333' },
            globalMode === 'simultaneous' && styles.tabButtonTextActive
          ]}>Simultaneous</Text>
          <Text style={styles.tabButtonDescription}>
          Start at the same time
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            globalMode === 'manual' && styles.tabButtonActive,
            { backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff' }
          ]}
          onPress={() => setGlobalMode('manual')}
        >
          <Text style={[
            styles.tabButtonText,
            { color: isDarkMode ? '#ffffff' : '#333333' },
            globalMode === 'manual' && styles.tabButtonTextActive
          ]}>Start</Text>
          <Text style={styles.tabButtonDescription}>
          manually
          </Text>
        </TouchableOpacity>
      </View>
      

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  headerButton: {
    padding: 10,
  },
  headerButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#007AFF',
  },
  addButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  addButtonTextDisabled: {
    color: '#666666',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tabButtonActive: {
    borderColor: '#FF9500',
    backgroundColor: '#fff8f0',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tabButtonTextActive: {
    color: '#FF9500',
  },
  tabButtonDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  favoriteSpace: {
    width: 80,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  content: {
    flex: 1,
  },
  timerContainer: {
    padding: 10,
  },
  singleTimerGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
  threeColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
});
