import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';

export default function ProfileScreen({ navigation }: any) {
  const { user, logout, biometricAvailable, enableBiometric, disableBiometric } = useAuth();
  const { colors, theme, themeMode, setThemeMode } = useTheme();
  const { permission: notificationPermission, requestPermission } = useNotifications();

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: logout },
      ]
    );
  };

  const handleBiometricToggle = async (enabled: boolean) => {
    try {
      if (enabled) {
        await enableBiometric();
      } else {
        await disableBiometric();
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update biometric settings');
    }
  };

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled) {
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert('Permission Required', 'Please enable notifications in device settings');
      }
    }
  };

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const renderMenuItem = (
    icon: string,
    title: string,
    subtitle?: string,
    onPress?: () => void,
    rightComponent?: React.ReactNode,
    iconColor?: string
  ) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.menuItemLeft}>
        <Icon 
          name={icon} 
          size={24} 
          color={iconColor || colors.primary} 
          style={styles.menuIcon} 
        />
        <View style={styles.menuItemText}>
          <Text style={styles.menuItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || (onPress && (
        <Icon name="chevron-right" size={20} color={colors.text.muted} />
      ))}
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text.inverse,
    },
    userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text.primary,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: colors.text.muted,
    },
    section: {
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text.muted,
      marginBottom: 8,
      paddingHorizontal: 20,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    sectionContent: {
      backgroundColor: colors.card,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    menuIcon: {
      marginRight: 16,
    },
    menuItemText: {
      flex: 1,
    },
    menuItemTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text.primary,
    },
    menuItemSubtitle: {
      fontSize: 14,
      color: colors.text.muted,
      marginTop: 2,
    },
    logoutButton: {
      backgroundColor: colors.error,
      marginHorizontal: 20,
      marginVertical: 20,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
    },
    logoutButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    versionText: {
      textAlign: 'center',
      color: colors.text.muted,
      fontSize: 12,
      paddingBottom: 20,
    },
  });

  const userInitials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase()
    : 'GQ';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userInitials}</Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'guest@gqcars.com'}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderSection('Account', (
          <>
            {renderMenuItem(
              'account-edit',
              'Edit Profile',
              'Update your personal information',
              () => navigation.navigate('EditProfile')
            )}
            {renderMenuItem(
              'calendar',
              'Booking History',
              'View your past bookings',
              () => navigation.navigate('Bookings')
            )}
            {renderMenuItem(
              'credit-card',
              'Payment Methods',
              'Manage your payment options',
              () => navigation.navigate('PaymentMethods')
            )}
          </>
        ))}

        {renderSection('Security', (
          <>
            {biometricAvailable && renderMenuItem(
              'fingerprint',
              'Biometric Authentication',
              'Use Face ID or Touch ID to sign in',
              undefined,
              <Switch
                value={false} // You'd track this in state
                onValueChange={handleBiometricToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.text.primary}
              />
            )}
            {renderMenuItem(
              'lock',
              'Change Password',
              'Update your account password',
              () => navigation.navigate('ChangePassword')
            )}
            {renderMenuItem(
              'two-factor-authentication',
              'Two-Factor Authentication',
              'Add an extra layer of security',
              () => navigation.navigate('TwoFactor')
            )}
          </>
        ))}

        {renderSection('Preferences', (
          <>
            {renderMenuItem(
              'bell',
              'Notifications',
              'Manage notification preferences',
              undefined,
              <Switch
                value={notificationPermission}
                onValueChange={handleNotificationToggle}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.text.primary}
              />
            )}
            {renderMenuItem(
              'palette',
              'Theme',
              `Currently using ${theme} mode`,
              () => {
                const nextMode = themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'auto' : 'light';
                setThemeMode(nextMode);
              }
            )}
            {renderMenuItem(
              'map',
              'Location Services',
              'Manage location permissions',
              () => navigation.navigate('LocationSettings')
            )}
          </>
        ))}

        {renderSection('Support', (
          <>
            {renderMenuItem(
              'help-circle',
              'Help & Support',
              'Get help with your account',
              () => navigation.navigate('Support')
            )}
            {renderMenuItem(
              'file-document',
              'Terms & Privacy',
              'Read our terms and privacy policy',
              () => navigation.navigate('Legal')
            )}
            {renderMenuItem(
              'star',
              'Rate App',
              'Share your feedback',
              () => {
                // Open app store for rating
              }
            )}
            {renderMenuItem(
              'information',
              'About',
              'App version and information',
              () => navigation.navigate('About')
            )}
          </>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}