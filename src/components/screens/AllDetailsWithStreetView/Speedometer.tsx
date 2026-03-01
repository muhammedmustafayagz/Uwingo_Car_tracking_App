import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing } from "react-native";
import { LinearGradient } from 'react-native-linear-gradient';

const Speedometer = ({ value, max = 180, unit = "km/h" }: {
  value: number;
  max?: number;
  unit?: string;
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Calculate rotation (0 to 180 degrees)
  const rotation = animatedValue.interpolate({
    inputRange: [0, max],
    outputRange: ['-90deg', '90deg'],
  });

  // Animate when value changes
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: Math.min(value, max),
      duration: 1000,
      easing: Easing.bezier(0.34, 1.56, 0.64, 1), // Spring-like easing
      useNativeDriver: true,
    }).start();
  }, [value]);

  // Calculate color based on value percentage
  const getGradientColors = () => {
    const percentage = value / max;
    if (percentage < 0.3) return ['#4CAF50', '#8BC34A']; // Green
    if (percentage < 0.6) return ['#FFC107', '#FF9800']; // Yellow to Orange
    return ['#FF5722', '#F44336']; // Orange to Red
  };

  // Calculate segments for the gauge
  const renderSegments = () => {
    const segments = [];
    const segmentCount = 9;

    for (let i = 0; i <= segmentCount; i++) {
      const segmentRotation = (i / segmentCount) * 180 - 90;
      const isActive = i <= (value / max) * segmentCount;

      segments.push(
        <View
          key={i}
          style={[
            styles.segment,
            {
              transform: [{ rotate: `${segmentRotation}deg` }],
              backgroundColor: isActive ? '#3b82f6' : '#ddd',
              opacity: isActive ? 1 : 0.3,
            },
          ]}
        />
      );
    }
    return segments;
  };

  return (
    <View style={styles.container}>
      {/* Main gauge */}
      <View style={styles.gaugeContainer}>
        {/* Gradient background */}
        <LinearGradient
          colors={['#f8f9fa', '#ffffff']}
          style={styles.gradientBackground}
        />

        {/* Segments small box that show 20 km for one*/}
        <View style={styles.segmentsContainer}>
          {renderSegments()}
        </View>

        {/* Tick marks */}
        <View style={[styles.ticksContainer,
          //  { borderColor: 'red', borderWidth: 2 }
        ]}>
          {[0, 45, 90, 135, 180].map((deg) => (
            <View
              key={deg}
              style={[
                styles.tick,
                { transform: [{ rotate: `${deg - 90}deg` }] }
              ]}
            />
          ))}
        </View>

        {/* Needle */}
        <Animated.View
          style={[
            styles.needleContainer,
            { transform: [{ rotate: rotation }] }
          ]}
        >
          <View style={styles.needleBase}>
            <LinearGradient
              colors={['#4a5568', '#2d3748']}
              style={styles.needle}
            />
          </View>
        </Animated.View>

        {/* Center cap with glass effect */}
        <View style={styles.centerCap}>
          <LinearGradient
            colors={['#ffffff', '#e9ecef']}
            style={styles.capInner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.capHighlight} />
          </LinearGradient>
        </View>

        {/* Value display */}
        <View style={styles.valueContainer}>
          <Text style={styles.currentValue}>{Math.round(value)}</Text>
          <Text style={styles.unit}>{unit}</Text>
        </View>
      </View>

      {/* Max value label */}
      <View style={styles.maxContainer}>
        <Text style={styles.maxLabel}>MAX</Text>
        <Text style={styles.maxValue}>{max} {unit}</Text>
      </View>

      {/* Status indicator */}
      <View style={styles.statusContainer}>
        <View style={[styles.statusDot, {
          backgroundColor: value / max > 0.8 ? '#ef4444' : '#10b981'
        }]} />
        <Text style={styles.statusText}>
          {value / max > 0.8 ? 'High Speed' : 'Normal'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    // backgroundColor: '#ffffff',
    // borderRadius: 24,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 12,
    // elevation: 8,
  },
  gaugeContainer: {
    width: 200,
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  gradientBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderBottomWidth: 0,
  },
  segmentsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  segment: {
    position: 'absolute',
    width: 4,
    height: 15,
    backgroundColor: '#3b82f6',
    bottom: 0,
    borderRadius: 2,
    transformOrigin: 'bottom',
  },
  ticksContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tick: {
    position: 'absolute',
    width: 1,
    height: 8,
    backgroundColor: '#bdadb0',
    bottom: 0,
    transformOrigin: 'bottom',
  },
  needleContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    transformOrigin: 'bottom',
  },
  needleBase: {
    width: 3,
    height: 70,
    borderRadius: 1.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  needle: {
    flex: 1,
  },
  centerCap: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    bottom: -12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  capInner: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capHighlight: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    opacity: 0.8,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  valueContainer: {
    position: 'absolute',
    top: 15,
    alignItems: 'center',
  },
  currentValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  unit: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    marginTop: -4,
  },
  maxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  maxLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  maxValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
});

export default Speedometer;