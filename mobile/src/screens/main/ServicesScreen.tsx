import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  color: string;
  features: string[];
}

const servicesData: Service[] = [
  {
    id: '1',
    title: 'Close Protection',
    description: 'Professional personal security and bodyguard services',
    price: 'From £150/day',
    icon: 'shield',
    color: '#007AFF',
    features: ['Trained bodyguards', 'Risk assessment', '24/7 protection'],
  },
  {
    id: '2',
    title: 'VIP Transport',
    description: 'Secure luxury transportation with trained drivers',
    price: 'From £200/day',
    icon: 'car',
    color: '#34C759',
    features: ['Luxury vehicles', 'Security drivers', 'Route planning'],
  },
  {
    id: '3',
    title: 'Corporate Security',
    description: 'Complete security solutions for businesses',
    price: 'From £500/month',
    icon: 'business',
    color: '#FF9500',
    features: ['Security guards', 'Access control', 'CCTV monitoring'],
  },
  {
    id: '4',
    title: 'Event Security',
    description: 'Professional security for private and corporate events',
    price: 'From £80/hour',
    icon: 'calendar',
    color: '#FF3B30',
    features: ['Crowd control', 'VIP protection', 'Emergency response'],
  },
  {
    id: '5',
    title: 'Wedding Security',
    description: 'Discreet security services for your special day',
    price: 'From £300/day',
    icon: 'heart',
    color: '#AF52DE',
    features: ['Discreet protection', 'Guest management', 'Venue security'],
  },
  {
    id: '6',
    title: 'Private Hire',
    description: 'Flexible security services for various occasions',
    price: 'From £120/day',
    icon: 'people',
    color: '#FF2D92',
    features: ['Flexible hours', 'Custom solutions', 'Quick response'],
  },
];

interface ServiceCardProps {
  service: Service;
  onPress: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress }) => (
  <TouchableOpacity style={styles.serviceCard} onPress={onPress}>
    <View style={styles.serviceHeader}>
      <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
        <Ionicons name={service.icon as any} size={24} color="#fff" />
      </View>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceTitle}>{service.title}</Text>
        <Text style={styles.servicePrice}>{service.price}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </View>
    <Text style={styles.serviceDescription}>{service.description}</Text>
    <View style={styles.featuresContainer}>
      {service.features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <Ionicons name="checkmark-circle" size={16} color={service.color} />
          <Text style={styles.featureText}>{feature}</Text>
        </View>
      ))}
    </View>
  </TouchableOpacity>
);

export default function ServicesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState(servicesData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredServices(servicesData);
    } else {
      const filtered = servicesData.filter(service =>
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  const handleServicePress = (service: Service) => {
    console.log(`Selected service: ${service.title}`);
    // Navigate to service details or booking screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Security Services</Text>
        <Text style={styles.headerSubtitle}>Professional protection when you need it</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.servicesContainer}>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onPress={() => handleServicePress(service)}
              />
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search" size={48} color="#ccc" />
              <Text style={styles.noResultsTitle}>No services found</Text>
              <Text style={styles.noResultsText}>
                Try searching with different keywords
              </Text>
            </View>
          )}
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Need custom security solutions?</Text>
          <Text style={styles.contactText}>
            Contact our team for personalized security packages
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </TouchableOpacity>
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
  },
  servicesContainer: {
    padding: 16,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  servicePrice: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginTop: 2,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  featuresContainer: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
  },
  noResultsContainer: {
    alignItems: 'center',
    padding: 40,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  noResultsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
  },
  contactContainer: {
    margin: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});