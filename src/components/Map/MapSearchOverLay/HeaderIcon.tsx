import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
// Assuming LucideIconButton exports the Icon component or icons list
import * as LucideIcons from 'lucide-react-native'
import { LucideIconNames } from '@/components/IconButton/LucideIconButton'

interface HeaderIconProps {
  setOpenedTab: React.Dispatch<React.SetStateAction<"All" | "Groups" | "Filters" | null>>;
  openedTab: "All" | "Groups" | "Filters" | null;
  icon: LucideIconNames;
  tabValue: "All" | "Groups" | "Filters"; // Added this to make the component reusable
}

export default function HeaderIcon({ setOpenedTab, openedTab, icon, tabValue }: HeaderIconProps) {

  const IconComponent = (LucideIcons as any)[icon];

  const handlePress = () => {
    setOpenedTab((prev) => (prev === tabValue ? null : tabValue));
  };

  return (
    <TouchableOpacity
      style={[styles.iconBtn, openedTab === tabValue && styles.activeIcon]}
      onPress={handlePress}
    >
      {IconComponent && <IconComponent color="white" size={20} />}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iconBtn: {
    padding: 8,
    marginLeft: 2
  },
  activeIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4
  },
})