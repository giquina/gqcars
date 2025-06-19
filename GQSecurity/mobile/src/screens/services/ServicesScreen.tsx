import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { ServiceType } from '../../../shared/src/types';

const { width } = Dimensions.get('window');

interface Service {
  type: ServiceType;
  name: string;
  description: string;
  icon: string;
  features: string[];
  priceRange: string;
  color: string;
}

const SERVICES: Service[] = [
  {
    type: 'private-hire',
    name: 'Private Hire',
    description: 'Premium chauffeur services with luxury vehicles',
    icon: 'car-luxury',
    features: ['Professional Chauffeurs', 'Luxury Vehicles', 'Airport Transfers', '24/7 Availability'],
    priceRange: '£50-150/hour',
    color: '#3b82f6',
  },
  {
    type: 'close-protection',
    name: 'Close Protection',
    description: 'Personal security and close protection services',
    icon: 'shield-account',
    features: ['Trained Security Officers', 'Risk Assessment', 'Discrete Protection', 'Emergency Response'],
    priceRange: '£200-500/day',
    color: '#ef4444',
  },
  {
    type: 'corporate',
    name: 'Corporate Security',
    description: 'Business security and executive protection',
    icon: 'office-building',
    features: ['Executive Protection', 'Event Security', 'Asset Protection', 'Security Consulting'],
    priceRange: '£150-400/day',
    color: '#10b981',
  },
  {
    type: 'vip',
    name: 'VIP Services',
    description: 'Exclusive VIP treatment and luxury experiences',
    icon: 'crown',
    features: ['Red Carpet Service', 'Personal Concierge', 'Luxury Transport', 'Priority Access'],
    priceRange: '£300-1000/event',
    color: '#f59e0b',
  },
  {
    type: 'wedding',
    name: 'Wedding Security',
    description: 'Specialized security for your special day',
    icon: 'heart',
    features: ['Venue Security', 'Guest Management', 'Gift Protection', 'Discrete Presence'],
    priceRange: '£500-2000/day',
    color: '#ec4899',
  },
];

export default function ServicesScreen({ navigation }: any) {
  const { colors } = useTheme();

  const handleServicePress = (service: Service) => {
    navigation.navigate('BookingFlow', { serviceType: service.type });
  };

  const renderServiceCard = (service: Service) => (
    <TouchableOpacity
      key={service.type}
      style={[styles.serviceCard, { borderLeftColor: service.color }]}
      onPress={() => handleServicePress(service)}
    >
      <View style={styles.serviceHeader}>
        <View style={[styles.iconContainer, { backgroundColor: service.color }]}>
          <Icon name={service.icon} size={32} color="#ffffff" />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.priceRange}>{service.priceRange}</Text>
        </View>
      </View>
      
      <Text style={styles.serviceDescription}>{service.description}</Text>
      
      <View style={styles.featuresContainer}>
        {service.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="check-circle" size={16} color={service.color} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={[styles.bookButton, { backgroundColor: service.color }]}>
        <Text style={styles.bookButtonText}>Book Now</Text>
        <Icon name="arrow-right" size={16} color="#ffffff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: 20,
      paddingBottom: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text.primary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.muted,
      lineHeight: 22,
    },
    servicesContainer: {
      paddingHorizontal: 20,
    },
    serviceCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderLeftWidth: 4,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    serviceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    iconContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    serviceInfo: {
      flex: 1,
    },
    serviceName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text.primary,
      marginBottom: 4,
    },
    priceRange: {
      fontSize: 14,
      color: colors.text.muted,
      fontWeight: '500',
    },
    serviceDescription: {
      fontSize: 15,
      color: colors.text.secondary,
      lineHeight: 22,
      marginBottom: 16,
    },
    featuresContainer: {
      marginBottom: 20,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    featureText: {
      fontSize: 14,
      color: colors.text.primary,
      marginLeft: 8,
      flex: 1,
    },
    bookButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      borderRadius: 8,
    },
    bookButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
      marginRight: 8,
    },
    emergencyContainer: {
      backgroundColor: colors.error,
      margin: 20,
      borderRadius: 16,
      padding: 20,
      alignItems: 'center',
    },
    emergencyTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
      marginTop: 12,
      marginBottom: 8,
    },
    emergencyText: {
      fontSize: 14,
      color: '#ffffff',
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 16,
    },
    emergencyButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    emergencyButtonText: {
      color: '#ffffff',
      fontSize: 14,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Services</Text>
        <Text style={styles.subtitle}>
          Professional security and transport services tailored to your needs
        </Text>
      </View>

      <ScrollView style={styles.servicesContainer} showsVerticalScrollIndicator={false}>
        {SERVICES.map(renderServiceCard)}
        
        <View style={styles.emergencyContainer}>
          <Icon name="alert-octagon" size={40} color="#ffffff" />
          <Text style={styles.emergencyTitle}>24/7 Emergency Response</Text>
          <Text style={styles.emergencyText}>
            Need immediate assistance? Our emergency response team is available 24/7 for urgent situations.
          </Text>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Emergency Contact</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}