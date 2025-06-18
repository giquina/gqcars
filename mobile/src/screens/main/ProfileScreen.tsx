import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileOption {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'navigation' | 'switch' | 'action';
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

interface ProfileSectionProps {
  title: string;
  options: ProfileOption[];
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, options }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionItem,
            index === options.length - 1 && styles.lastOptionItem,
          ]}
          onPress={option.onPress}
          disabled={option.type === 'switch'}
        >
          <View style={styles.optionLeft}>
            <Ionicons name={option.icon as any} size={20} color="#666" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              {option.subtitle && (
                <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
              )}
            </View>
          </View>
          <View style={styles.optionRight}>
            {option.type === 'switch' ? (
              <Switch
                value={option.value}
                onValueChange={option.onToggle}
                trackColor={{ false: '#e1e1e1', true: '#007AFF' }}
                thumbColor="#fff"
              />
            ) : (
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => {
          console.log('User signed out');
          // Handle logout logic here
        }},
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          console.log('Account deletion requested');
          // Handle account deletion logic here
        }},
      ]
    );
  };

  const accountOptions: ProfileOption[] = [
    {
      id: 'personal-info',
      title: 'Personal Information',
      subtitle: 'Name, email, phone number',
      icon: 'person',
      type: 'navigation',
      onPress: () => console.log('Navigate to personal info'),
    },
    {
      id: 'security',
      title: 'Security Settings',
      subtitle: 'Password, two-factor authentication',
      icon: 'shield',
      type: 'navigation',
      onPress: () => console.log('Navigate to security settings'),
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      subtitle: 'Credit cards, billing information',
      icon: 'card',
      type: 'navigation',
      onPress: () => console.log('Navigate to payment methods'),
    },
    {
      id: 'emergency-contacts',
      title: 'Emergency Contacts',
      subtitle: 'Manage emergency contact list',
      icon: 'call',
      type: 'navigation',
      onPress: () => console.log('Navigate to emergency contacts'),
    },
  ];

  const preferencesOptions: ProfileOption[] = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      subtitle: 'Booking updates and reminders',
      icon: 'notifications',
      type: 'switch',
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
    },
    {
      id: 'biometric',
      title: 'Biometric Login',
      subtitle: 'Use Face ID or Touch ID',
      icon: 'finger-print',
      type: 'switch',
      value: biometricEnabled,
      onToggle: setBiometricEnabled,
    },
    {
      id: 'location',
      title: 'Location Services',
      subtitle: 'For better service matching',
      icon: 'location',
      type: 'switch',
      value: locationEnabled,
      onToggle: setLocationEnabled,
    },
  ];

  const supportOptions: ProfileOption[] = [
    {
      id: 'help',
      title: 'Help Center',
      subtitle: 'FAQs and support articles',
      icon: 'help-circle',
      type: 'navigation',
      onPress: () => console.log('Navigate to help center'),
    },
    {
      id: 'contact',
      title: 'Contact Support',
      subtitle: '24/7 customer service',
      icon: 'chatbubble',
      type: 'navigation',
      onPress: () => console.log('Navigate to contact support'),
    },
    {
      id: 'feedback',
      title: 'Send Feedback',
      subtitle: 'Help us improve the app',
      icon: 'star',
      type: 'navigation',
      onPress: () => console.log('Navigate to feedback'),
    },
  ];

  const appOptions: ProfileOption[] = [
    {
      id: 'about',
      title: 'About',
      subtitle: 'Version 1.0.0',
      icon: 'information-circle',
      type: 'navigation',
      onPress: () => console.log('Navigate to about'),
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: 'document-text',
      type: 'navigation',
      onPress: () => console.log('Navigate to privacy policy'),
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: 'document',
      type: 'navigation',
      onPress: () => console.log('Navigate to terms of service'),
    },
  ];

  const dangerOptions: ProfileOption[] = [
    {
      id: 'logout',
      title: 'Sign Out',
      icon: 'log-out',
      type: 'action',
      onPress: handleLogout,
    },
    {
      id: 'delete',
      title: 'Delete Account',
      icon: 'trash',
      type: 'action',
      onPress: handleDeleteAccount,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
            <TouchableOpacity style={styles.editImageButton}>
              <Ionicons name="camera" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <Text style={styles.memberSince}>Member since 2022</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Services Used</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Active Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>£2,450</Text>
            <Text style={styles.statLabel}>Total Spent</Text>
          </View>
        </View>

        <ProfileSection title="Account" options={accountOptions} />
        <ProfileSection title="Preferences" options={preferencesOptions} />
        <ProfileSection title="Support" options={supportOptions} />
        <ProfileSection title="App Information" options={appOptions} />
        
        <View style={styles.dangerSection}>
          <ProfileSection title="" options={dangerOptions} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e1e1e1',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 14,
    color: '#999',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#e1e1e1',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    marginHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e1e1e1',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastOptionItem: {
    borderBottomWidth: 0,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    marginLeft: 12,
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  optionRight: {
    marginLeft: 12,
  },
  dangerSection: {
    marginBottom: 32,
  },
});