import Home from "./../screens/Home.js";
import History from "./../screens/History.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ history, setHistory }) {
  return (
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
        // tabBarActiveBackgroundColor: "#e1f7dd",
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
      <Tab.Screen name="Home">
        {() => <Home history={history} setHistory={setHistory} />}
      </Tab.Screen>
      <Tab.Screen name="History">
        {() => <History history={history} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
