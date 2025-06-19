import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const { colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name);
      // Navigation will be handled by AuthContext
    } catch (error) {
      Alert.alert(
        'Registration Failed',
        error instanceof Error ? error.message : 'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    header: {
      alignItems: 'center',
      marginBottom: 40,
      marginTop: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.muted,
      textAlign: 'center',
    },
    form: {
      flex: 1,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 50,
      color: colors.text.primary,
      fontSize: 16,
    },
    passwordToggle: {
      padding: 4,
    },
    registerButton: {
      backgroundColor: colors.primary,
      height: 50,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 16,
    },
    registerButtonText: {
      color: colors.text.inverse,
      fontSize: 16,
      fontWeight: '600',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
    },
    loginText: {
      color: colors.text.muted,
      fontSize: 14,
    },
    loginLink: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
    },
    terms: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 16,
      paddingHorizontal: 4,
    },
    termsText: {
      color: colors.text.muted,
      fontSize: 12,
      lineHeight: 16,
      marginLeft: 8,
    },
    termsLink: {
      color: colors.primary,
      textDecorationLine: 'underline',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join GQ Cars for premium transport services</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Icon name="account" size={20} color={colors.text.muted} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={colors.text.muted}
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="email" size={20} color={colors.text.muted} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={colors.text.muted}
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color={colors.text.muted} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor={colors.text.muted}
              value={formData.phone}
              onChangeText={(value) => updateFormData('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color={colors.text.muted} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.text.muted}
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={colors.text.muted}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock-check" size={20} color={colors.text.muted} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={colors.text.muted}
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.passwordToggle}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={20}
                color={colors.text.muted}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.terms}>
            <Icon name="information" size={16} color={colors.text.muted} />
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.text.inverse} />
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}