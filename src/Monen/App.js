import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./src/screens/Dashboard";
import LoginScreen from "./src/screens/login.index";
import StartScreen from "./src/screens/StartScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";


// import OtwScreen from "./src/screens/otpWithEmailScreen";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_300Light,
} from "@expo-google-fonts/montserrat";
import { NavigationContainer } from "@react-navigation/native";
import { white, dark_gray, black } from "constants/colors.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import BottomNavigator from "./src/navigations/BottomNavigation";

library.add(fas, fab, far);
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
library.add(fas, fab, far);
const Stack = createStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_300Light,
    Montserrat_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <NavigationContainer>
      <BottomNavigator />
    </NavigationContainer>
  );
}
