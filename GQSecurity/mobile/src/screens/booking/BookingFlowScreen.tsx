import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { useLocation } from '../../context/LocationContext';
import { ServiceType } from '../../../shared/src/types';

interface BookingData {
  serviceType: ServiceType;
  startDate: Date;
  endDate: Date;
  location: string;
  requirements: string;
  officers?: number;
  vehicles?: number;
}

export default function BookingFlowScreen({ navigation, route }: any) {
  const { colors } = useTheme();
  const { location } = useLocation();
  const serviceType = route.params?.serviceType || 'private-hire';
  
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceType,
    startDate: new Date(),
    endDate: new Date(),
    location: '',
    requirements: '',
    officers: serviceType === 'close-protection' ? 1 : undefined,
    vehicles: 1,
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate data
      if (!bookingData.location.trim()) {
        Alert.alert('Error', 'Please provide a location');
        return;
      }

      // Submit booking
      Alert.alert(
        'Booking Submitted',
        'Your booking request has been submitted. We will confirm details shortly.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit booking. Please try again.');
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((stepNumber) => (
        <View key={stepNumber} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            step >= stepNumber && styles.stepCircleActive,
          ]}>
            <Text style={[
              styles.stepText,
              step >= stepNumber && styles.stepTextActive,
            ]}>
              {stepNumber}
            </Text>
          </View>
          {stepNumber < 4 && (
            <View style={[
              styles.stepLine,
              step > stepNumber && styles.stepLineActive,
            ]} />
          )}
        </View>
      ))}
    </View>
  );

  const renderServiceSelection = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Select Service</Text>
      <View style={styles.serviceOptions}>
        {[
          { type: 'private-hire', name: 'Private Hire', icon: 'car-luxury' },
          { type: 'close-protection', name: 'Close Protection', icon: 'shield-account' },
          { type: 'corporate', name: 'Corporate', icon: 'office-building' },
          { type: 'vip', name: 'VIP Service', icon: 'crown' },
          { type: 'wedding', name: 'Wedding', icon: 'heart' },
        ].map((service) => (
          <TouchableOpacity
            key={service.type}
            style={[
              styles.serviceOption,
              bookingData.serviceType === service.type && styles.serviceOptionActive,
            ]}
            onPress={() => setBookingData({ ...bookingData, serviceType: service.type as ServiceType })}
          >
            <Icon
              name={service.icon}
              size={24}
              color={bookingData.serviceType === service.type ? colors.primary : colors.text.muted}
            />
            <Text style={[
              styles.serviceOptionText,
              bookingData.serviceType === service.type && styles.serviceOptionTextActive,
            ]}>
              {service.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderLocationInput = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Location Details</Text>
      <View style={styles.inputContainer}>
        <Icon name="map-marker" size={20} color={colors.text.muted} />
        <TextInput
          style={styles.input}
          placeholder="Enter pickup/destination location"
          placeholderTextColor={colors.text.muted}
          value={bookingData.location}
          onChangeText={(text) => setBookingData({ ...bookingData, location: text })}
          multiline
        />
      </View>
      
      <TouchableOpacity style={styles.currentLocationButton}>
        <Icon name="crosshairs-gps" size={20} color={colors.primary} />
        <Text style={styles.currentLocationText}>Use Current Location</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRequirements = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Special Requirements</Text>
      <View style={styles.inputContainer}>
        <Icon name="note-text" size={20} color={colors.text.muted} />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Any special requirements or notes..."
          placeholderTextColor={colors.text.muted}
          value={bookingData.requirements}
          onChangeText={(text) => setBookingData({ ...bookingData, requirements: text })}
          multiline
          numberOfLines={4}
        />
      </View>

      {bookingData.serviceType === 'close-protection' && (
        <View style={styles.counterContainer}>
          <Text style={styles.counterLabel}>Number of Officers</Text>
          <View style={styles.counter}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setBookingData({
                ...bookingData,
                officers: Math.max(1, (bookingData.officers || 1) - 1)
              })}
            >
              <Icon name="minus" size={20} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.counterValue}>{bookingData.officers || 1}</Text>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => setBookingData({
                ...bookingData,
                officers: (bookingData.officers || 1) + 1
              })}
            >
              <Icon name="plus" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );

  const renderSummary = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Booking Summary</Text>
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Service:</Text>
          <Text style={styles.summaryValue}>
            {bookingData.serviceType.replace('-', ' ').toUpperCase()}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Location:</Text>
          <Text style={styles.summaryValue}>{bookingData.location}</Text>
        </View>
        {bookingData.requirements && (
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Requirements:</Text>
            <Text style={styles.summaryValue}>{bookingData.requirements}</Text>
          </View>
        )}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Estimated Cost:</Text>
          <Text style={styles.summaryPrice}>£150 - £300</Text>
        </View>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    stepIndicator: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    stepContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stepCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    stepCircleActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    stepText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.text.muted,
    },
    stepTextActive: {
      color: colors.text.inverse,
    },
    stepLine: {
      width: 40,
      height: 2,
      backgroundColor: colors.border,
      marginHorizontal: 8,
    },
    stepLineActive: {
      backgroundColor: colors.primary,
    },
    stepContent: {
      flex: 1,
      padding: 20,
    },
    stepTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text.primary,
      marginBottom: 24,
    },
    serviceOptions: {
      gap: 12,
    },
    serviceOption: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
    },
    serviceOptionActive: {
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}10`,
    },
    serviceOptionText: {
      fontSize: 16,
      color: colors.text.secondary,
      marginLeft: 12,
    },
    serviceOptionTextActive: {
      color: colors.text.primary,
      fontWeight: '600',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 16,
    },
    input: {
      flex: 1,
      marginLeft: 12,
      fontSize: 16,
      color: colors.text.primary,
    },
    textArea: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    currentLocationButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      backgroundColor: `${colors.primary}20`,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    currentLocationText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 8,
    },
    counterContainer: {
      marginTop: 20,
    },
    counterLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.primary,
      marginBottom: 12,
    },
    counter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    counterValue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text.primary,
      marginHorizontal: 20,
      minWidth: 30,
      textAlign: 'center',
    },
    summaryCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    summaryLabel: {
      fontSize: 14,
      color: colors.text.muted,
    },
    summaryValue: {
      fontSize: 14,
      color: colors.text.primary,
      fontWeight: '600',
      flex: 1,
      textAlign: 'right',
    },
    summaryPrice: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: 'bold',
    },
    buttonContainer: {
      flexDirection: 'row',
      padding: 20,
      gap: 12,
    },
    button: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    backButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    nextButton: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.muted,
    },
    buttonTextPrimary: {
      color: colors.text.inverse,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {renderStepIndicator()}
      
      <ScrollView style={{ flex: 1 }}>
        {step === 1 && renderServiceSelection()}
        {step === 2 && renderLocationInput()}
        {step === 3 && renderRequirements()}
        {step === 4 && renderSummary()}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={() => setStep(step - 1)}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
            {step === 4 ? 'Submit Booking' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}