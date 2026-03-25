import { COLORS } from '@/constants';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
function SplashScreen() {

  const { t } = useTranslation()
  return (
    <View style={styles.splash}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text>{t('common.loadingData')}</Text>
    </View>
  )
};


const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background, // Your splash screen color
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default SplashScreen