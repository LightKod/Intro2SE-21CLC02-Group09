// BottomNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../screens/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DeckPage from "../screens/DeckPage";
import DeckView from "../screens/DeckView";
import DeckLearn from "../screens/Learn";
import CoursePage from "../screens/CoursePage";
import CourseDetail from "../screens/CourseDetail";

import SettingScreen from "../screens/SettingScreen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const getTabBarIcon =
  (icon) =>
  ({ color, size }) => (
    <FontAwesomeIcon icon={icon} color={color} size={size} />
  );
const DeckStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="DeckPage" component={DeckPage} />
    <Stack.Screen name="DeckView" component={DeckView} />
    <Stack.Screen name="DeckLearn" component={DeckLearn} />
  </Stack.Navigator>
);

const CourseStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="CoursePage" component={CoursePage} />
    <Stack.Screen name="CourseDetail" component={CourseDetail} />
  </Stack.Navigator>
);
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false, // Hide the header
        tabBarStyle: { backgroundColor: "#000000" }, // Set background color
        tabBarActiveTintColor: "#FFFFFF", // Set text color for active tab
        tabBarInactiveTintColor: "#808080", // Set text color for inactive tab
        tabBarLabelStyle: { fontFamily: "Montserrat_400Regular" },
        tabBarIcon: ({ color, size }) => {
          let icon;
          switch (route.name) {
            case "Deck":
              icon = getTabBarIcon("fa-folder");
              break;
            case "Library":
              icon = getTabBarIcon("fa-search");
              break;
            case "Home":
              icon = getTabBarIcon("fa-home");
              break;
            case "Course":
              icon = getTabBarIcon("fa-graduation-cap");
              break;
            case "Settings":
              icon = getTabBarIcon("fa-cog");
              break;
            default:
              break;
          }
          return icon({ color, size });
        },
      })}
    >
      <Tab.Screen name="Deck" component={DeckStack} />
      <Tab.Screen name="Library" component={Dashboard} />
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Course" component={CourseStack} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
