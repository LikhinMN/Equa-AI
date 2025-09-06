import { ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import "./../global.css";
import Card from "./../components/Card.js";

const History = ({ history }) => {
  const navigation = useNavigation();

  const handleCardPress = (item, index) => {
    navigation.navigate("CalculationDetail", {
      calculation: item,
      index: index,
      timestamp: new Date().toISOString(), // Add timestamp if needed
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pb-20">
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Calculation History
        </Text>
        <Text className="text-gray-600 mb-6">
          {history.length} calculation{history.length !== 1 ? "s" : ""} saved
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {history.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-gray-500 text-lg text-center">
              No calculations yet{"\n"}
              Start solving math problems to see your history
            </Text>
          </View>
        ) : (
          <View className="px-4 space-y-3">
            {history.map((item, index) => {
              const parsed = typeof item === "string" ? JSON.parse(item) : item;
              return (
                <Card
                  key={index}
                  item={parsed}
                  index={index}
                  onPress={() => handleCardPress(parsed, index)}
                />
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
