import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { headerStyles } from '../styles/HeaderStyles';

const Header = ({ isDarkMode, isLandscape, onToggleDarkMode, onToggleOrientation }) => {
  return (
    <View style={[
      headerStyles.container,
      { backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff' }
    ]}>
      <View style={headerStyles.buttonContainer}>
        <TouchableOpacity 
          style={headerStyles.button} 
          onPress={onToggleOrientation}
        >
          <Ionicons 
            name={isLandscape ? "phone-portrait" : "phone-landscape"} 
            size={24} 
            color={isDarkMode ? "#ffffff" : "#000000"} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={headerStyles.button} 
          onPress={onToggleDarkMode}
        >
          <Ionicons 
            name={isDarkMode ? "sunny-outline" : "moon-outline"} 
            size={24} 
            color={isDarkMode ? "#ffffff" : "#000000"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header; 