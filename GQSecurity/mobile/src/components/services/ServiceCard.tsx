import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { ServiceType } from '../../../shared/src/types';

interface ServiceCardProps {
  service: {
    type: ServiceType;
    name: string;
    icon: string;
    description: string;
  };
  onPress: () => void;
}

export default function ServiceCard({ service, onPress }: ServiceCardProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      width: '48%',
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    serviceName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
      textAlign: 'center',
      marginBottom: 4,
    },
    serviceDescription: {
      fontSize: 12,
      color: colors.text.muted,
      textAlign: 'center',
      lineHeight: 16,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={service.icon} size={24} color={colors.text.inverse} />
      </View>
      <Text style={styles.serviceName}>{service.name}</Text>
      <Text style={styles.serviceDescription}>{service.description}</Text>
    </TouchableOpacity>
  );
}