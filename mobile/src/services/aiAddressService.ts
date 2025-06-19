import AsyncStorage from '@react-native-async-storage/async-storage';
import { Location } from '../types';
import apiService from './api';

interface AddressSuggestion {
  id: string;
  address: string;
  shortAddress: string;
  location: Location;
  type: 'frequent' | 'recent' | 'google' | 'ml_prediction';
  frequency: number;
  lastUsed: Date;
  commonHours: number[];
  category: 'home' | 'work' | 'restaurant' | 'hotel' | 'airport' | 'other';
  score: number;
  confidence: number;
}

interface UserLocationPattern {
  address: string;
  location: Location;
  frequency: number;
  timePatterns: {
    hour: number;
    dayOfWeek: number;
    month: number;
    count: number;
  }[];
  lastUsed: Date;
  category: string;
}

interface MLPredictionContext {
  userId: string;
  currentTime: Date;
  currentLocation?: Location;
  previousBookings: any[];
  seasonalPatterns: any[];
  weatherConditions?: any;
  eventData?: any[];
}

export class AIAddressService {
  private static readonly CACHE_KEY = 'address_suggestions_cache';
  private static readonly USER_PATTERNS_KEY = 'user_location_patterns';
  private static readonly MAX_SUGGESTIONS = 8;
  private static readonly CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  static async getSmartSuggestions(
    query: string, 
    userId: string,
    context?: Partial<MLPredictionContext>
  ): Promise<AddressSuggestion[]> {
    try {
      // Get cached suggestions first for quick response
      const cached = await this.getCachedSuggestions(query);
      
      // Run all suggestion sources in parallel
      const [userHistory, googlePlaces, mlPredictions] = await Promise.all([
        this.getUserFrequentLocations(userId, query),
        this.getGooglePlacePredictions(query),
        this.getMLSuggestions(query, userId, context)
      ]);

      // Combine all suggestions
      const allSuggestions = [...userHistory, ...googlePlaces, ...mlPredictions];
      
      // Remove duplicates and rank suggestions
      const uniqueSuggestions = this.removeDuplicates(allSuggestions);
      const rankedSuggestions = await this.rankSuggestions(uniqueSuggestions, userId, context);
      
      // Cache the results
      await this.cacheSuggestions(query, rankedSuggestions);
      
      return rankedSuggestions.slice(0, this.MAX_SUGGESTIONS);
    } catch (error) {
      console.error('Failed to get smart suggestions:', error);
      
      // Fallback to cached suggestions or basic Google Places
      const cached = await this.getCachedSuggestions(query);
      if (cached.length > 0) {
        return cached;
      }
      
      return await this.getGooglePlacePredictions(query);
    }
  }

  private static async getUserFrequentLocations(
    userId: string, 
    query: string
  ): Promise<AddressSuggestion[]> {
    try {
      const patterns = await this.getUserLocationPatterns(userId);
      const currentHour = new Date().getHours();
      const currentDay = new Date().getDay();
      
      return patterns
        .filter(pattern => 
          pattern.address.toLowerCase().includes(query.toLowerCase()) ||
          pattern.category.toLowerCase().includes(query.toLowerCase())
        )
        .map(pattern => ({
          id: `frequent_${pattern.address}`,
          address: pattern.address,
          shortAddress: this.shortenAddress(pattern.address),
          location: pattern.location,
          type: 'frequent' as const,
          frequency: pattern.frequency,
          lastUsed: pattern.lastUsed,
          commonHours: this.extractCommonHours(pattern.timePatterns),
          category: pattern.category as any,
          score: 0, // Will be calculated in ranking
          confidence: Math.min(pattern.frequency / 10, 1) // Max confidence at 10+ uses
        }));
    } catch (error) {
      console.error('Failed to get user frequent locations:', error);
      return [];
    }
  }

  private static async getGooglePlacePredictions(query: string): Promise<AddressSuggestion[]> {
    try {
      if (query.length < 3) return [];
      
      const response = await apiService.searchPlaces(query);
      
      if (!response.success || !response.data) {
        return [];
      }

      return response.data.map(place => ({
        id: `google_${place.placeId}`,
        address: place.address,
        shortAddress: place.description,
        location: {
          address: place.address,
          latitude: 0, // Will be filled when selected
          longitude: 0,
          placeId: place.placeId
        },
        type: 'google' as const,
        frequency: 0,
        lastUsed: new Date(),
        commonHours: [],
        category: 'other' as const,
        score: 0,
        confidence: 0.7 // Google Places generally reliable
      }));
    } catch (error) {
      console.error('Failed to get Google Place predictions:', error);
      return [];
    }
  }

  private static async getMLSuggestions(
    query: string,
    userId: string,
    context?: Partial<MLPredictionContext>
  ): Promise<AddressSuggestion[]> {
    try {
      // This would connect to your ML service
      // For now, we'll implement smart heuristics
      
      const userPatterns = await this.getUserLocationPatterns(userId);
      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentDay = currentTime.getDay();
      
      // Predict based on time patterns
      const timeBased = this.predictTimeBasedLocations(userPatterns, currentHour, currentDay);
      
      // Predict based on sequence patterns
      const sequenceBased = await this.predictSequenceBasedLocations(userId, userPatterns);
      
      // Predict based on contextual clues
      const contextBased = this.predictContextualLocations(query, context);
      
      return [...timeBased, ...sequenceBased, ...contextBased]
        .filter(suggestion => 
          suggestion.address.toLowerCase().includes(query.toLowerCase())
        )
        .map(suggestion => ({
          ...suggestion,
          type: 'ml_prediction' as const,
          confidence: Math.min(suggestion.confidence * 1.2, 1) // Boost ML predictions
        }));
    } catch (error) {
      console.error('Failed to get ML suggestions:', error);
      return [];
    }
  }

  private static async rankSuggestions(
    suggestions: AddressSuggestion[],
    userId: string,
    context?: Partial<MLPredictionContext>
  ): Promise<AddressSuggestion[]> {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentDay = currentTime.getDay();
    
    return suggestions
      .map(suggestion => ({
        ...suggestion,
        score: this.calculateRelevanceScore(suggestion, currentHour, currentDay, context)
      }))
      .sort((a, b) => b.score - a.score);
  }

  private static calculateRelevanceScore(
    suggestion: AddressSuggestion,
    currentHour: number,
    currentDay: number,
    context?: Partial<MLPredictionContext>
  ): number {
    let score = 0;

    // Base score by type
    switch (suggestion.type) {
      case 'frequent':
        score += 20;
        break;
      case 'recent':
        score += 15;
        break;
      case 'ml_prediction':
        score += 18;
        break;
      case 'google':
        score += 10;
        break;
    }

    // Frequency boost
    score += Math.min(suggestion.frequency * 2, 20);

    // Time pattern matching
    if (suggestion.commonHours.includes(currentHour)) {
      score += 15;
    }

    // Recency boost
    const daysSinceLastUse = this.getDaysSince(suggestion.lastUsed);
    if (daysSinceLastUse < 7) {
      score += Math.max(10 - daysSinceLastUse, 0);
    }

    // Category context boost
    if (context?.currentTime) {
      score += this.getCategoryTimeBoost(suggestion.category, currentHour);
    }

    // Confidence multiplier
    score *= suggestion.confidence;

    return score;
  }

  private static getCategoryTimeBoost(category: string, hour: number): number {
    const timeBoosts = {
      'work': hour >= 8 && hour <= 18 ? 10 : 0,
      'home': (hour <= 8 || hour >= 19) ? 10 : 0,
      'restaurant': (hour >= 11 && hour <= 14) || (hour >= 18 && hour <= 22) ? 8 : 0,
      'airport': hour >= 5 && hour <= 23 ? 5 : 0,
      'hotel': true ? 3 : 0 // Hotels relevant any time
    };
    
    return timeBoosts[category as keyof typeof timeBoosts] || 0;
  }

  private static predictTimeBasedLocations(
    patterns: UserLocationPattern[],
    currentHour: number,
    currentDay: number
  ): AddressSuggestion[] {
    return patterns
      .filter(pattern => {
        // Find patterns that match current time
        return pattern.timePatterns.some(tp => 
          Math.abs(tp.hour - currentHour) <= 2 && 
          tp.dayOfWeek === currentDay &&
          tp.count >= 2 // Must have happened at least twice
        );
      })
      .map(pattern => ({
        id: `time_based_${pattern.address}`,
        address: pattern.address,
        shortAddress: this.shortenAddress(pattern.address),
        location: pattern.location,
        type: 'ml_prediction' as const,
        frequency: pattern.frequency,
        lastUsed: pattern.lastUsed,
        commonHours: this.extractCommonHours(pattern.timePatterns),
        category: pattern.category as any,
        score: 0,
        confidence: 0.8
      }));
  }

  private static async predictSequenceBasedLocations(
    userId: string,
    patterns: UserLocationPattern[]
  ): Promise<AddressSuggestion[]> {
    // This would analyze booking sequences to predict next likely destination
    // For example: if user often goes from airport → hotel, suggest hotel when at airport
    
    // Simplified implementation
    return [];
  }

  private static predictContextualLocations(
    query: string,
    context?: Partial<MLPredictionContext>
  ): AddressSuggestion[] {
    const contextualSuggestions: AddressSuggestion[] = [];
    
    // Weather-based suggestions
    if (context?.weatherConditions?.isRaining) {
      // Suggest covered pickup locations during rain
    }
    
    // Event-based suggestions
    if (context?.eventData) {
      // Suggest venues near ongoing events
    }
    
    // Time-based contextual suggestions
    const hour = new Date().getHours();
    if (hour >= 22 || hour <= 6) {
      // Late night: suggest hotels, airports, hospitals
    }
    
    return contextualSuggestions;
  }

  // Utility methods
  private static async getUserLocationPatterns(userId: string): Promise<UserLocationPattern[]> {
    try {
      const cached = await AsyncStorage.getItem(`${this.USER_PATTERNS_KEY}_${userId}`);
      if (cached) {
        const patterns = JSON.parse(cached);
        return patterns.map((p: any) => ({
          ...p,
          lastUsed: new Date(p.lastUsed)
        }));
      }
      return [];
    } catch (error) {
      console.error('Failed to get user location patterns:', error);
      return [];
    }
  }

  private static async getCachedSuggestions(query: string): Promise<AddressSuggestion[]> {
    try {
      const cached = await AsyncStorage.getItem(`${this.CACHE_KEY}_${query}`);
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < this.CACHE_DURATION) {
          return data.suggestions.map((s: any) => ({
            ...s,
            lastUsed: new Date(s.lastUsed)
          }));
        }
      }
      return [];
    } catch (error) {
      return [];
    }
  }

  private static async cacheSuggestions(query: string, suggestions: AddressSuggestion[]): Promise<void> {
    try {
      const data = {
        suggestions,
        timestamp: Date.now()
      };
      await AsyncStorage.setItem(`${this.CACHE_KEY}_${query}`, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to cache suggestions:', error);
    }
  }

  private static removeDuplicates(suggestions: AddressSuggestion[]): AddressSuggestion[] {
    const seen = new Set<string>();
    return suggestions.filter(suggestion => {
      const key = suggestion.address.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  private static shortenAddress(address: string): string {
    // Extract the main part of the address (first part before comma)
    return address.split(',')[0].trim();
  }

  private static extractCommonHours(timePatterns: any[]): number[] {
    const hourCounts = new Map<number, number>();
    
    timePatterns.forEach(pattern => {
      const currentCount = hourCounts.get(pattern.hour) || 0;
      hourCounts.set(pattern.hour, currentCount + pattern.count);
    });
    
    // Return hours that appear frequently (threshold: 3+ times)
    return Array.from(hourCounts.entries())
      .filter(([hour, count]) => count >= 3)
      .map(([hour]) => hour);
  }

  private static getDaysSince(date: Date): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  // Public methods for updating user patterns
  static async recordAddressUsage(
    userId: string,
    address: string,
    location: Location,
    category: string = 'other'
  ): Promise<void> {
    try {
      const patterns = await this.getUserLocationPatterns(userId);
      const now = new Date();
      
      const existingPattern = patterns.find(p => p.address === address);
      
      if (existingPattern) {
        // Update existing pattern
        existingPattern.frequency++;
        existingPattern.lastUsed = now;
        existingPattern.timePatterns.push({
          hour: now.getHours(),
          dayOfWeek: now.getDay(),
          month: now.getMonth(),
          count: 1
        });
      } else {
        // Create new pattern
        patterns.push({
          address,
          location,
          frequency: 1,
          timePatterns: [{
            hour: now.getHours(),
            dayOfWeek: now.getDay(),
            month: now.getMonth(),
            count: 1
          }],
          lastUsed: now,
          category
        });
      }
      
      // Keep only the most recent 100 patterns
      const trimmedPatterns = patterns
        .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime())
        .slice(0, 100);
      
      await AsyncStorage.setItem(
        `${this.USER_PATTERNS_KEY}_${userId}`,
        JSON.stringify(trimmedPatterns)
      );
    } catch (error) {
      console.error('Failed to record address usage:', error);
    }
  }

  static async clearUserPatterns(userId: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(`${this.USER_PATTERNS_KEY}_${userId}`);
    } catch (error) {
      console.error('Failed to clear user patterns:', error);
    }
  }
}

export default AIAddressService;