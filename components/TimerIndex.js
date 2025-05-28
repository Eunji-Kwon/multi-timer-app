// components/TimerIndex.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';

const TimerIndex = ({ selectedIndex, onSelectIndex }) => {
  const indices = Array.from({ length: 9 }, (_, i) => i + 1);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
      <Text style={styles.title}>Timers</Text>
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
                isLandscape && styles.indexItemLandscape,
                selectedIndex === index && styles.selectedItem
              ]}
              onPress={() => onSelectIndex(index)}
            >
              <Text style={[styles.indexText, isLandscape && styles.indexTextLandscape]}>
                {index}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TimerIndex;

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: '100%',
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
  },
  containerLandscape: {
    width: 100,
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
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
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  indexItemLandscape: {
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
    color: '#333333',
  },
  indexTextLandscape: {
    fontSize: 20,
  },
});
