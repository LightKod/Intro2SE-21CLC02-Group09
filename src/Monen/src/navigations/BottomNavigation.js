// BottomNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import DeckPage from "../screens/DeckPage";

const Tab = createBottomTabNavigator();
const getTabBarIcon =
  (icon) =>
  ({ color, size }) => (
    <FontAwesomeIcon icon={icon} color={color} size={size} />
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
      <Tab.Screen name="Deck" component={DeckPage} />
      <Tab.Screen name="Library" component={Dashboard} />
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Course" component={Dashboard} />
      <Tab.Screen name="Settings" component={Dashboard} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
