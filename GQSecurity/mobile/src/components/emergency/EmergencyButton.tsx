import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../context/ThemeContext';

interface EmergencyButtonProps {
  onPress: () => void;
}

export default function EmergencyButton({ onPress }: EmergencyButtonProps) {
  const { colors } = useTheme();
  const [pulseAnim] = useState(new Animated.Value(1));
  const [isPressed, setIsPressed] = useState(false);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.stopAnimation();
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = () => {
    setIsPressed(true);
    startPulseAnimation();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const handlePressOut = () => {
    setIsPressed(false);
    stopPulseAnimation();
  };

  const handlePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onPress();
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginVertical: 32,
    },
    emergencyButton: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.error,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.error,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    emergencyButtonPressed: {
      backgroundColor: '#dc2626', // Darker red when pressed
    },
    emergencyIcon: {
      marginBottom: 4,
    },
    emergencyText: {
      color: colors.text.primary,
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    warningText: {
      color: colors.text.muted,
      fontSize: 12,
      textAlign: 'center',
      marginTop: 16,
      maxWidth: 200,
      lineHeight: 16,
    },
    instructionText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>Emergency Services</Text>
      
      <Animated.View
        style={[
          { transform: [{ scale: pulseAnim }] }
        ]}
      >
        <TouchableOpacity
          style={[
            styles.emergencyButton,
            isPressed && styles.emergencyButtonPressed,
          ]}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <Icon
            name="alert-octagon"
            size={36}
            color={colors.text.primary}
            style={styles.emergencyIcon}
          />
          <Text style={styles.emergencyText}>EMERGENCY</Text>
        </TouchableOpacity>
      </Animated.View>

      <Text style={styles.warningText}>
        Press for immediate assistance. This will alert our security team and emergency services with your location.
      </Text>
    </View>
  );
}