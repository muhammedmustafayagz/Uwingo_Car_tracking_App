import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "@/constants";
import { LucideIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { getRGBA } from '@/utils/getRGBA';
interface LegendItemProps {
  color: string;
  label: string;
  value: number;
  icon: LucideIcon;
}

// Helper to create the light background version of the main color


const LegendItem = ({ color, label, value, icon: Icon }: LegendItemProps) => {

  const { t } = useTranslation()
  return (
    <View style={styles.legendItem}>
      {/* Icon Container with subtle background */}
      <View style={[styles.iconWrapper, { backgroundColor: getRGBA(color, 0.12) }]}>
        <Icon size={14} color={color} strokeWidth={2.5} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.legendVal, { color: color }]}>{value}</Text>
        <Text style={styles.legendLab}>{t(label)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingRight: 8
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  legendVal: {
    fontWeight: '800',
    fontSize: 15,
    lineHeight: 18
  },
  legendLab: {
    fontSize: 11,
    color: '#8E8E93', // or COLORS.textSecondary
    fontWeight: '500',
    marginTop: 1
  },
});

export default LegendItem;



// import { COLORS } from "@/constants";
// import { StyleSheet, View, Text } from "react-native";

// const LegendItem = ({ color, label, value }: { color: string, label: string, value: number }) => (
//   <View style={[styles.legendItem, { borderColor: 'red', borderWidth: 2 }]}>
//     <View style={[styles.dot, { backgroundColor: color }]} />
//     <Text style={styles.legendVal}>{value}</Text>
//     <Text style={styles.legendLab}>{label}</Text>
//   </View>
// );

// export default LegendItem
// const styles = StyleSheet.create({
//   legendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
//   dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
//   legendVal: { fontWeight: 'bold', width: 20, fontSize: 13 },
//   legendLab: { fontSize: 11, color: COLORS.textSecondary },
// });