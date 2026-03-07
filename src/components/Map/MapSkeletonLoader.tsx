import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const MapSkeletonLoader = () => {
  // Create animated values for shimmer effect
  const shimmerValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();

    return () => shimmerAnimation.stop();
  }, []);

  const translateX = shimmerValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <View style={styles.skeletonContainer}>
      {/* Map area skeleton */}
      <View style={styles.mapSkeleton}>
        <Animated.View
          style={[
            styles.shimmerOverlay,
            {
              transform: [{ translateX }],
            },
          ]}
        />

        {/* Grid lines for map effect */}
        <View style={styles.gridContainer}>
          {[...Array(5)].map((_, index) => (
            <View key={`h-${index}`} style={[styles.gridLine, styles.horizontalLine]} />
          ))}
          {[...Array(5)].map((_, index) => (
            <View key={`v-${index}`} style={[styles.gridLine, styles.verticalLine]} />
          ))}
        </View>

        {/* Map markers skeleton */}
        <View style={styles.markerCluster}>
          {[...Array(8)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.markerSkeleton,
                {
                  top: `${15 + (index * 10)}%`,
                  left: `${10 + (index * 12)}%`,
                },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Bottom sheet skeleton */}
      <View style={styles.bottomSheetSkeleton}>
        <View style={styles.dragHandle} />

        {/* Stats cards */}
        <View style={styles.statsContainer}>
          {[...Array(3)].map((_, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIcon} />
              <View style={styles.statTextContainer}>
                <View style={styles.statLabel} />
                <View style={styles.statValue} />
              </View>
            </View>
          ))}
        </View>

        {/* List items skeleton */}
        <View style={styles.listHeader}>
          <View style={styles.listTitle} />
          <View style={styles.listFilter} />
        </View>

        {[...Array(3)].map((_, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.itemIcon} />
            <View style={styles.itemContent}>
              <View style={styles.itemTitle} />
              <View style={styles.itemSubtitle} />
              <View style={styles.itemMeta} />
            </View>
          </View>
        ))}
      </View>

      {/* Loading text overlay */}
      <View style={styles.loadingTextContainer}>
        <View style={styles.loadingDot} />
        <View style={styles.loadingDot} />
        <View style={styles.loadingDot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5',
  },
  mapSkeleton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    position: 'relative',
    overflow: 'hidden',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: '100%',
    height: '100%',
    transform: [{ translateX: 0 }],
  },
  gridContainer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#bdbdbd',
  },
  horizontalLine: {
    left: 0,
    right: 0,
    height: 1,
  },
  verticalLine: {
    top: 0,
    bottom: 0,
    width: 1,
  },
  markerCluster: {
    ...StyleSheet.absoluteFillObject,
  },
  markerSkeleton: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#bdbdbd',
    borderWidth: 2,
    borderColor: '#9e9e9e',
  },
  bottomSheetSkeleton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    marginRight: 8,
  },
  statTextContainer: {
    flex: 1,
  },
  statLabel: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 4,
    width: '60%',
  },
  statValue: {
    height: 14,
    backgroundColor: '#e0e0e0',
    borderRadius: 7,
    width: '80%',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listTitle: {
    height: 20,
    width: 120,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  listFilter: {
    height: 32,
    width: 80,
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  itemIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 8,
    width: '70%',
  },
  itemSubtitle: {
    height: 14,
    backgroundColor: '#e0e0e0',
    borderRadius: 7,
    marginBottom: 6,
    width: '50%',
  },
  itemMeta: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    width: '40%',
  },
  loadingTextContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -50 }],
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2196F3',
    marginHorizontal: 4,
    opacity: 0.5,
  },
});

// Create an animated version for the loading dots
const AnimatedMapSkeleton = () => {
  const dot1Opacity = React.useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = React.useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const animateDot = (dot: any, delay: any) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 600,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      );
    };

    Animated.parallel([
      animateDot(dot1Opacity, 0),
      animateDot(dot2Opacity, 200),
      animateDot(dot3Opacity, 400),
    ]).start();
  }, []);

  return (
    <View style={styles.skeletonContainer}>
      {/* Map area skeleton */}
      <View style={styles.mapSkeleton}>
        <Animated.View style={[styles.shimmerOverlay]} />

        {/* Grid lines */}
        <View style={styles.gridContainer}>
          {[...Array(5)].map((_, i) => (
            <View key={`h-${i}`} style={[styles.gridLine, styles.horizontalLine, { top: `${i * 25}%` }]} />
          ))}
          {[...Array(5)].map((_, i) => (
            <View key={`v-${i}`} style={[styles.gridLine, styles.verticalLine, { left: `${i * 25}%` }]} />
          ))}
        </View>

        {/* Random markers */}
        {[...Array(8)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.markerSkeleton,
              {
                top: `${15 + Math.sin(i) * 10 + i * 5}%`,
                left: `${10 + Math.cos(i) * 15 + i * 8}%`,
              },
            ]}
          />
        ))}
      </View>

      {/* Bottom sheet */}
      <View style={styles.bottomSheetSkeleton}>
        <View style={styles.dragHandle} />

        {/* Stats */}
        <View style={styles.statsContainer}>
          {[...Array(3)].map((_, i) => (
            <View key={i} style={styles.statCard}>
              <View style={styles.statIcon} />
              <View style={styles.statTextContainer}>
                <View style={styles.statLabel} />
                <View style={styles.statValue} />
              </View>
            </View>
          ))}
        </View>

        {/* List items */}
        <View style={styles.listHeader}>
          <View style={styles.listTitle} />
          <View style={styles.listFilter} />
        </View>

        {[...Array(3)].map((_, i) => (
          <View key={i} style={styles.listItem}>
            <View style={styles.itemIcon} />
            <View style={styles.itemContent}>
              <View style={styles.itemTitle} />
              <View style={styles.itemSubtitle} />
              <View style={styles.itemMeta} />
            </View>
          </View>
        ))}
      </View>

      {/* Animated loading dots */}
      <View style={styles.loadingTextContainer}>
        <Animated.View style={[styles.loadingDot, { opacity: dot1Opacity }]} />
        <Animated.View style={[styles.loadingDot, { opacity: dot2Opacity }]} />
        <Animated.View style={[styles.loadingDot, { opacity: dot3Opacity }]} />
      </View>
    </View>
  );
};

export default AnimatedMapSkeleton;