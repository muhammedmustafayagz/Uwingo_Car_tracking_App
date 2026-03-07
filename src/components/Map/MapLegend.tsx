import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Info,
  X,
  Circle,
  Route,
  Gauge,
  Car, // Added Car to match the vehicle icon
  LucideIcon
} from 'lucide-react-native';
import { COLORS } from '@/constants';

const { width } = Dimensions.get('window');

// Updated MapLegenItem to match the vehicle marker style
const MapLegenItem = ({
  icon: IconComponent,
  borderColor,
  statusColor: statusColor,
  bgColor,
  title,
  description,
  isVehicleStyle = true
}: {
  icon: LucideIcon,
  borderColor: string,
  statusColor: string,
  bgColor: string,
  title: string,
  description: string,
  isVehicleStyle?: boolean
}) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendIcon, { backgroundColor: bgColor, borderColor: borderColor, borderWidth: isVehicleStyle ? 1.5 : 0 }]}>
      <IconComponent size={18} color={statusColor} strokeWidth={2.5} />
      {/* If it's representing a vehicle state, add the status dot */}
      {isVehicleStyle && <View style={[styles.miniStatusDot, { backgroundColor: statusColor }]} />}
    </View>
    <View style={styles.legendContent}>
      <Text style={styles.legendTitle}>{title}</Text>
      <Text style={styles.legendDescription}>{description}</Text>
    </View>
  </View>
);

const MapLegend = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.legendButton}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Info size={24} color="white" />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.legendDropdown}>
            <View style={styles.legendHeader}>
              <Text style={styles.headerTitle}>Harita Lejantı</Text>
              <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                <X size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Vehicle States - Using the Car icon to match Map Markers */}
            <MapLegenItem
              icon={Car}
              borderColor={COLORS.active}
              statusColor={COLORS.active}
              bgColor="#F8F9FA"
              isVehicleStyle={true}
              title="Hareketli Araç"
              description="Kontak açık ve araç hareket halinde."
            />
            <MapLegenItem
              icon={Car}
              borderColor={COLORS.inactive}
              statusColor={COLORS.inactive}
              bgColor="#F8F9FA"
              isVehicleStyle={true}
              title="Duran Araç"
              description="Kontak kapalı veya araç sabit."
            />

            <View style={styles.divider} />

            <MapLegenItem
              icon={Car}
              bgColor="#F8F9FA"
              borderColor={COLORS.routeViolation}
              statusColor={COLORS.active}
              title="Hareketli & Güzergah İhlali"
              description="Araç hareket halinde ancak rota dışına çıktı."
            />

            {/* 2. Route Violation + Stopped */}
            <MapLegenItem
              icon={Car}
              bgColor="#F8F9FA"
              borderColor={COLORS.routeViolation}
              statusColor={COLORS.inactive}
              title="Duran & Güzergah İhlali"
              description="Araç duruyor ancak rota dışı bir konumda."
            />

            <View style={styles.divider} />

            {/* 3. Speed Violation + Moving */}
            <MapLegenItem
              icon={Car}
              bgColor="#F8F9FA"
              borderColor={COLORS.speedViolation}
              statusColor={COLORS.active}
              title="Hareketli & Hız İhlali"
              description="Araç hareket halinde ve hız limitini aşıyor."
            />

            {/* 4. Speed Violation + Stopped */}
            <MapLegenItem
              icon={Car}
              bgColor="#F8F9FA"
              borderColor={COLORS.speedViolation}
              statusColor={COLORS.inactive}
              title="Duran & Hız İhlali"
              description="Hız ihlali yapıldı ve araç şu an duruyor."
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    zIndex: 1000,
  },
  legendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  legendDropdown: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    width: width * 0.85,
    maxWidth: 320,
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20 },
      android: { elevation: 10 },
    }),
  },
  legendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  closeButton: { padding: 4 },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  legendIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
  },
  miniStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: 'white',
  },
  legendContent: { flex: 1 },
  legendTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  legendDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginVertical: 8,
  }
});

export default MapLegend;














// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   Dimensions,
//   Platform,
// } from 'react-native';
// // Import Lucide Icons
// import {
//   Info,
//   X,
//   Circle,
//   Route,
//   Gauge,
//   // Road,
//   LucideIcon
// } from 'lucide-react-native';
// import { COLORS } from '@/constants';

// const { width } = Dimensions.get('window');

// const MapLegenItem = ({ icon: IconComponent, color, bgColor, title, description }: { icon: LucideIcon, color: string, bgColor: string, title: string, description: string }) => (
//   <View style={styles.legendItem}>
//     <View style={[styles.legendIcon, { backgroundColor: bgColor }]}>
//       <IconComponent size={18} color={color} fill={title.includes("Circle") ? color : 'none'} />
//     </View>
//     <View style={styles.legendContent}>
//       <Text style={styles.legendTitle}>{title}</Text>
//       <Text style={styles.legendDescription}>{description}</Text>
//     </View>
//   </View>
// );

// const MapLegend = () => {
//   const [visible, setVisible] = useState(false);

//   return (
//     <View style={styles.container}>
//       {/* Floating Info Button */}
//       <TouchableOpacity
//         style={styles.legendButton}
//         onPress={() => setVisible(true)}
//         activeOpacity={0.8}
//       >
//         <Info size={24} color="white" />
//       </TouchableOpacity>

//       <Modal
//         transparent={true}
//         visible={visible}
//         animationType="fade"
//         onRequestClose={() => setVisible(false)}
//       >
//         <TouchableOpacity
//           style={styles.modalOverlay}
//           activeOpacity={1}
//           onPress={() => setVisible(false)}
//         >
//           <View style={styles.legendDropdown}>
//             <View style={styles.legendHeader}>
//               <Text style={styles.headerTitle}>Map Legend</Text>
//               <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
//                 <X size={20} color="#666" />
//               </TouchableOpacity>
//             </View>

//             <MapLegenItem
//               icon={Circle}
//               color={COLORS.active}
//               bgColor={COLORS.activeBg}
//               title="Green Circle"
//               description="Vehicle is ON and working"
//             />
//             <MapLegenItem
//               icon={Circle}
//               color={COLORS.inactive}
//               bgColor={COLORS.inactiveBg}
//               title="Red Circle"
//               description="Vehicle is OFF (not working)"
//             />
//             <MapLegenItem
//               icon={Route}
//               color="#AF52DE"
//               bgColor="rgba(175, 82, 222, 0.1)"
//               title="Purple Line"
//               description="Route violation (route exceeded)"
//             />
//             <MapLegenItem
//               icon={Gauge}
//               color="#007AFF"
//               bgColor="rgba(0, 122, 255, 0.1)"
//               title="Blue Line"
//               description="Route and speed violation"
//             />
//             {/* <LegendItem
//               icon={Road}
//               color="#8E8E93"
//               bgColor="rgba(142, 142, 147, 0.1)"
//               title="Gray Line"
//               description="Normal speed violation area"
//             /> */}
//           </View>
//         </TouchableOpacity>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 30, // Adjusted for safe areas
//     left: 20,
//     zIndex: 1000,
//   },
//   legendButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: COLORS.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.2,
//         shadowRadius: 8,
//       },
//       android: {
//         elevation: 6,
//       },
//     }),
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.2)', // Slight dimming effect
//     justifyContent: 'flex-end',
//   },
//   legendDropdown: {
//     position: 'absolute',
//     bottom: 100,
//     left: 20,
//     width: width * 0.8,
//     maxWidth: 300,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     ...Platform.select({
//       ios: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 10 },
//         shadowOpacity: 0.1,
//         shadowRadius: 20,
//       },
//       android: {
//         elevation: 10,
//       },
//     }),
//   },
//   legendHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     paddingBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: COLORS.textPrimary,
//   },
//   closeButton: {
//     padding: 5,
//   },
//   legendItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//   },
//   legendIcon: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   legendContent: {
//     flex: 1,
//   },
//   legendTitle: {
//     fontWeight: '600',
//     fontSize: 14,
//     color: COLORS.textPrimary,
//   },
//   legendDescription: {
//     fontSize: 12,
//     color: COLORS.textSecondary,
//     marginTop: 2,
//   },
// });

// export default MapLegend;