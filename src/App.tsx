/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import RootStack from './navigation/StackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {

  return (
    <NavigationContainer>
      <SafeAreaProvider>

        <RootStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}






