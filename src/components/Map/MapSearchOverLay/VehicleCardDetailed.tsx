import { ReshapedData } from '@/components/Map/MapView';
import { COLORS } from '@/constants';
import { RootDrawerParamList } from '@/navigation/types';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {
  Activity,
  ChevronDown,
  Clock,
  Eye,
  MapPin,
  Zap
} from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


interface VehicleDetailProps {
  plate: string;
  address: string;
  speed: number;
  lastUpdate: string; // e.g., "6 Gün"
  stats: {
    distance: number;
    duration: string;
    maxSpeed: number;
    idleTime: number;
  };
}



// ... inside your VehicleDetailCard component

// const openStreetView = async (lat: number, lng: number) => {
//   // Construct the URL for Google Street View
//   // 'google.streetview:cbll=lat,lng' works for Android
//   // 'comgooglemaps://?center=lat,lng&mapmode=streetview' works for iOS
//   const url = Platform.select({
//     ios: `comgooglemaps://?center=${lat},${lng}&mapmode=streetview`,
//     android: `google.streetview:cbll=${lat},${lng}`,
//   });

//   try {
//     const supported = await Linking.canOpenURL(url!);
//     if (supported) {
//       await Linking.openURL(url!);
//     } else {
//       // Fallback to Browser if app isn't installed

//       // Mapillary uses a zoom-based URL to find the closest sequence
//       const url = `https://www.mapillary.com/app/?lat=${lat}&lng=${lng}&z=17`;
//       Linking.openURL(url);

//     }
//   } catch (error) {
//     Alert.alert("Hata", "Sokak görünümü açılamadı.");
//   }
// };

const VehicleDetailCard = ({ item }: { item: ReshapedData }) => {
  // 1. Add this function inside your component
  // const handleStreetViewPress = () => {
  //   if (item.lat && item.lng) {
  //     openStreetView(item.lat, item.lng);
  //   } else {
  //     Alert.alert("Uyarı", "Geçerli koordinat bulunamadı.");
  //   }
  // };
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  return (
    <View style={styles.container}>
      {/* 1. Top Header Section */}
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Activity size={24} color={COLORS.active} />
          <View style={[styles.statusBadge, { backgroundColor: COLORS.violations }]}>
            <Zap size={10} color="#FFF" fill="#FFF" />
          </View>
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.plateTitle}>{item.plate}</Text>
          <View style={styles.addressRow}>
            <MapPin size={14} color="#8E8E93" />
            <Text style={styles.addressText} numberOfLines={2}>{item.address}</Text>
          </View>
        </View>

        <View style={styles.timeRow}>
          <Clock size={14} color="#8E8E93" />
          <Text style={styles.timeText}>Son Guncelleme tarihi</Text>
        </View>
      </View>

      {/* 2. Speed Visualization (Placeholder for the graph) */}
      <View style={styles.speedSection}>
        <View style={styles.speedLabelRow}>
          <Text style={styles.speedLabel}>Hız</Text>
          <View style={styles.speedValueGroup}>
            <Text style={styles.speedValue}>{item.speed}</Text>
            <Text style={styles.speedUnit}>km/s</Text>
          </View>
        </View>
        {/* Simple grey gradient placeholder for the speed ramp */}
        <View style={styles.speedGraphPlaceholder} />
      </View>

      <View style={styles.divider} />

      {/* 3. Stats Grid */}
      <View style={styles.statsGrid}>
        <StatItem label="Mesafe" value={`${item.dailyKM} km`} />
        {/* <StatItem label="Süre" value={item.duration} />
        <StatItem label="En Yük. Hız" value={`${item.sp} km/s`} />
        <StatItem label="Top. Rölanti" value={stats.idleTime} /> */}
      </View>

      <View style={styles.divider} />

      {/* 4. Map Actions */}
      {/* <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton}>
          <MapIcon size={18} color="#555" />
          <Text style={styles.actionText}>Ayrı Harita</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
        // onPress={handleStreetViewPress} 
        >
          <Eye size={18} color="#555" />
          <Text style={styles.actionText}>Sokak Görünümü</Text>
        </TouchableOpacity>
      </View> */}

      {/* 5. Expand Button */}
      <TouchableOpacity style={styles.expandButton}
        onPress={() => navigation.navigate("All Details With Street View", { item: item })}
      >
        <ChevronDown size={20} color={COLORS.primary} />
        <Text style={styles.expandText}>Detaylar</Text>
      </TouchableOpacity>
    </View>
  );
};

// Sub-component for the grid items
const StatItem = ({ label, value }: { label: string; value: string | number }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,

    paddingTop: 16,
    // Matching your shadow style
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: COLORS.violations,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  statusBadge: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.violations,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  plateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  addressRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  addressText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
    paddingRight: 10,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 13,
    color: '#8E8E93',
    marginLeft: 4,
  },
  speedSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  speedLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  speedLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  speedValueGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  speedValue: {
    fontSize: 32,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  speedUnit: {
    fontSize: 14,
    color: '#1C1C1E',
    marginLeft: 4,
  },
  speedGraphPlaceholder: {
    height: 40,
    backgroundColor: '#F2F2F7',
    marginTop: 8,
    borderRadius: 4,
    // Add a simple opacity gradient look
    opacity: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginVertical: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  statBox: {
    alignItems: 'flex-start',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#48484A',
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 12,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 11,
    color: '#1C1C1E',
    marginTop: 6,
  },
  expandButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
  },
  expandText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },






});

export default VehicleDetailCard;