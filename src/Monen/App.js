import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Dashboard from "./src/screens/Dashboard";
import LoginScreen from "./src/screens/login.index";
import StartScreen from "./src/screens/StartScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";

// import OtwScreen from "./src/screens/otpWithEmailScreen";
import OtpScreen from "./src/screens/otpWithEmailScreen";
import NewPasswordScreen from './src/screens/NewPasswordScreen';
import SettingScreen from './src/screens/SettingScreen';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_300Light,
} from "@expo-google-fonts/montserrat";
import { white, dark_gray, black } from "constants/colors.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import BottomNavigator from "./src/navigations/BottomNavigation";

library.add(fas, fab, far);
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
library.add(fas, fab, far);
const Stack = createStackNavigator();

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
    <Provider >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="HomePage" component={BottomNavigator} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
