import { useAuthStore } from '@/store/local/authStore';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';
import { CirclePower } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
// ... your other imports

function CustomDrawerContent(props: any) {
  const { t } = useTranslation();
  const logout = useAuthStore(store => store.logout)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {/* This renders all the screens defined in your Navigator */}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* This section stays at the bottom */}
      <View style={styles.logoutSection}>

        <DrawerItem
          label={t("common.logout") || "Logout"}
          onPress={() => {
            // Add your logout logic here (e.g., clearing tokens)
            logout()
            console.log("User logged out");
          }}
          labelStyle={{ color: 'red' }}
          // Optional: Add an icon
          icon={({ color, size }) => <CirclePower color="red" size={size} />}
        />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  logoutSection: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingBottom: 20, // Adjust for notch/safe area
    marginTop: 'auto',
  },
});


export default CustomDrawerContent