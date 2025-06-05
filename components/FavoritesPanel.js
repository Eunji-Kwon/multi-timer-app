import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ToastAndroid, Platform, Alert } from 'react-native';

export default function FavoritesPanel({ favorites, onLoadSlot, onSaveSlot, onDeleteSlot }) {

  const notify = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  const handlePress = (index) => {
    const isFilled = favorites[index];
    if (isFilled) {
      onLoadSlot(index); // Load timers from slot
      notify(`Loaded favorite slot ${index + 1}`);
    } else {
      notify(`Slot ${index + 1} is empty. Long press to save current timers.`);
    }
  };

const handleLongPress = (index) => {
  const isFilled = favorites[index];
  if (isFilled) {
    Alert.alert(
      `Slot ${index + 1}`,
      'Do you want to delete this favorite?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            onDeleteSlot(index);
            notify(`Deleted favorite slot ${index + 1}`);
          }
        }
      ]
    );
  } else {
    onSaveSlot(index);
    notify(`Saved current timers to slot ${index + 1}`);
  }
};

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {favorites.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.slot, item && styles.slotFilled]}
            onPress={() => handlePress(index)}
            onLongPress={() => handleLongPress(index)}
          >
            <Text style={styles.text}>
              {item ? `${item.length}⏱` : index + 1}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '10%',
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  slot: {
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
  slotFilled: {
    backgroundColor: '#ffd580',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  }
});
