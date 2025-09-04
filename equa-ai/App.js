import { Text, View } from "react-native";
import React, { Component } from "react";
import Home from "./screens/Home.js";
import History from "./screens/History.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "./components/Header.js";
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <Header />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "History") {
                iconName = focused ? "time" : "time-outline";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#10B981",
            tabBarActiveBackgroundColor: "#def3fa",
            tabBarInactiveTintColor: "#9CA3AF",
            tabBarStyle: {
              position: "absolute",
              bottom: 5,
              left: 20,
              right: 20,
              elevation: 5,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              height: 65,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 5 },
              shadowRadius: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
            },
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="History" component={History} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
