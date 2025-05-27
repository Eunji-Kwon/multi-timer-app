import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const TimerIndex = ({ selectedIndex, onSelectIndex, isDarkMode, isTablet }) => {
  const indices = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <View style={[
      styles.container,
      isTablet && styles.containerTablet,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }
    ]}>
      <Text style={[
        styles.title,
        { color: isDarkMode ? '#ffffff' : '#333333' }
      ]}>
        Timers
      </Text>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.indexGrid}>
          {indices.map((index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indexItem,
                isTablet && styles.indexItemTablet,
                selectedIndex === index && styles.selectedItem,
                { backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff' }
              ]}
              onPress={() => onSelectIndex(index)}
            >
              <Text style={[
                styles.indexText,
                isTablet && styles.indexTextTablet,
                { color: isDarkMode ? '#ffffff' : '#333333' }
              ]}>
                {index}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: '100%',
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  containerTablet: {
    width: 100,
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  indexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  indexItem: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  indexItemTablet: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedItem: {
    backgroundColor: '#007AFF',
  },
  indexText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  indexTextTablet: {
    fontSize: 20,
  },
});

export default TimerIndex; 