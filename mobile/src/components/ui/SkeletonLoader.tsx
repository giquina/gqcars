import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ViewStyle,
} from 'react-native';
import { useTheme } from './ThemeProvider';

const { width: screenWidth } = Dimensions.get('window');

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const { theme } = useTheme();
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = () => {
      shimmerAnimation.setValue(0);
      Animated.timing(shimmerAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        shimmer();
      });
    };

    shimmer();
  }, [shimmerAnimation]);

  const translateX = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, screenWidth],
  });

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.colors.surface,
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
            backgroundColor: theme.colors.border,
          },
        ]}
      />
    </View>
  );
};

interface BookingCardSkeletonProps {
  style?: ViewStyle;
}

export const BookingCardSkeleton: React.FC<BookingCardSkeletonProps> = ({ style }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.bookingCard,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <SkeletonLoader width={80} height={24} borderRadius={12} />
        <SkeletonLoader width={60} height={16} />
      </View>

      {/* Location details */}
      <View style={styles.cardContent}>
        <View style={styles.locationRow}>
          <SkeletonLoader width={16} height={16} borderRadius={8} />
          <SkeletonLoader width="80%" height={16} style={{ marginLeft: 8 }} />
        </View>
        <View style={[styles.locationRow, { marginTop: 8 }]}>
          <SkeletonLoader width={16} height={16} borderRadius={8} />
          <SkeletonLoader width="70%" height={16} style={{ marginLeft: 8 }} />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <SkeletonLoader width={60} height={14} />
        <SkeletonLoader width={50} height={18} />
      </View>
    </View>
  );
};

interface ServiceCardSkeletonProps {
  style?: ViewStyle;
}

export const ServiceCardSkeleton: React.FC<ServiceCardSkeletonProps> = ({ style }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.serviceCard,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        },
        style,
      ]}
    >
      <SkeletonLoader width={48} height={48} borderRadius={24} />
      <SkeletonLoader width="80%" height={16} style={{ marginTop: 12 }} />
      <SkeletonLoader width="60%" height={12} style={{ marginTop: 4 }} />
    </View>
  );
};

interface ListSkeletonProps {
  itemCount?: number;
  renderItem: (index: number) => React.ReactElement;
  style?: ViewStyle;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  itemCount = 5,
  renderItem,
  style,
}) => {
  return (
    <View style={style}>
      {Array.from({ length: itemCount }, (_, index) => (
        <View key={index} style={{ marginBottom: 12 }}>
          {renderItem(index)}
        </View>
      ))}
    </View>
  );
};

interface ScreenSkeletonProps {
  showHeader?: boolean;
  showTabs?: boolean;
  children?: React.ReactNode;
}

export const ScreenSkeleton: React.FC<ScreenSkeletonProps> = ({
  showHeader = true,
  showTabs = false,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
      {showHeader && (
        <View style={styles.headerSkeleton}>
          <View style={styles.headerContent}>
            <View>
              <SkeletonLoader width={120} height={16} />
              <SkeletonLoader width={80} height={24} style={{ marginTop: 4 }} />
            </View>
            <SkeletonLoader width={32} height={32} borderRadius={16} />
          </View>
        </View>
      )}

      <View style={styles.contentSkeleton}>
        {children || (
          <ListSkeleton
            itemCount={6}
            renderItem={(index) => <BookingCardSkeleton />}
          />
        )}
      </View>

      {showTabs && (
        <View style={[styles.tabsSkeleton, { borderTopColor: theme.colors.border }]}>
          {Array.from({ length: 4 }, (_, index) => (
            <View key={index} style={styles.tabItem}>
              <SkeletonLoader width={24} height={24} borderRadius={12} />
              <SkeletonLoader width={40} height={12} style={{ marginTop: 4 }} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  bookingCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardContent: {
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  screenContainer: {
    flex: 1,
  },
  headerSkeleton: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  contentSkeleton: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tabsSkeleton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  tabItem: {
    alignItems: 'center',
  },
});

export default SkeletonLoader;