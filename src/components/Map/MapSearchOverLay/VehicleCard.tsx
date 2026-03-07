import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Navigation, Clock, ChevronRight, Car } from 'lucide-react-native';
import { COLORS } from '@/constants';

interface VehicleCardProps {
  plate?: string;
  address?: string;
  speed?: number | string;
  status?: boolean; // isWorking
  onPress?: () => void;
  violation?: boolean
}

const VehicleInfoCard = ({
  plate = '34 ABC 123',
  address = 'Istanbul, Esenyurt, Mevlana Mah...',
  speed = 0,
  status = true,
  onPress,
  violation = false
}: VehicleCardProps) => {

  const getStatusColor = () => {
    if (violation) return COLORS.violations;
    return status ? COLORS.active : COLORS.inactive;
  };

  const statusColor = getStatusColor();
  const iconColor = status ? COLORS.active : COLORS.inactive; // the small cirlce in border
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconCircle, { borderColor: statusColor }]}>
        <Car size={22} color={iconColor} />
        <View style={[styles.statusDot, { backgroundColor: iconColor }]} />
      </View>

      {/* 2. Info Content */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.plateText}>{plate}</Text>
          <View style={styles.speedBadge}>
            <Navigation size={12} color={COLORS.primary} style={styles.speedIcon} />
            <Text style={styles.speedText}>{speed} km/h</Text>
          </View>
        </View>

        <View style={styles.addressRow}>
          <MapPin size={14} color="#8E8E93" />
          <Text style={styles.addressText} numberOfLines={2}>
            {address}
          </Text>
        </View>
      </View>

      {/* 3. Right Arrow */}
      <ChevronRight size={20} color="#C7C7CC" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    // Subtle shadow for list items
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  plateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1C1C1E',
    letterSpacing: 0.5,
  },
  speedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  speedIcon: {
    marginRight: 4,
    transform: [{ rotate: '45deg' }],
  },
  speedText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 13,
    color: '#8E8E93',
    marginLeft: 4,
    flex: 1,
  },
});

export default VehicleInfoCard;