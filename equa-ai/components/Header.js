import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
export default function Header() {
  return (
    <SafeAreaView className="flex-row items-center justify-between px-6 py-2 bg-white shadow">
      <View className="flex-row items-center">
        <Feather name="pen-tool" size={24} color="#0f0f0f" />
        <Text className="ml-2 text-2xl font-bold text-gray-800">EquaAI</Text>
      </View>
      <TouchableOpacity className="bg-light-accentB p-2 borders rounded-full">
        <FontAwesome5 name="moon" size={20} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
