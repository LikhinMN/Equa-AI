import { useState } from "react";
import CalculationDetail from "./screens/Details.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "./components/Header.js";
import TabNavigator from "./components/Tab.js";
import { DummyData } from "./test.js";
const Stack = createStackNavigator();
export default function App() {
  const [history, setHistory] = useState(DummyData);
  return (
    <SafeAreaProvider>
      <Header />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main">
            {() => <TabNavigator history={history} setHistory={setHistory} />}
          </Stack.Screen>

          <Stack.Screen
            name="CalculationDetail"
            component={CalculationDetail}
            options={{
              presentation: "modal",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
