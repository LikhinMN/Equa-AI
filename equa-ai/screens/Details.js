import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";

const CalculationDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { calculation, index } = route.params;
  const { latex, result, steps, recognized } = calculation;

  const handleShare = async () => {
    try {
      const shareContent = `
Math Calculation #${index + 1}

Expression: ${recognized || "N/A"}
Result: ${result || "N/A"}

Steps:
${
  steps?.map((step, i) => `${i + 1}. ${step}`).join("\n") ||
  "No steps available"
}
      `.trim();

      await Share.share({
        message: shareContent,
        title: `Math Calculation #${index + 1}`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share calculation");
    }
  };

  const handleCopyResult = () => {
    Alert.alert("Copied!", "Result copied to clipboard");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-white px-4 py-4 shadow-sm border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 -ml-2"
          >
            <Ionicons name="arrow-back" size={24} color="#374151" />
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-gray-800">
            Calculation #{index + 1}
          </Text>

          <TouchableOpacity onPress={handleShare} className="p-2 -mr-2">
            <Ionicons name="share-outline" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4 space-y-6 gap-4">
          {recognized && (
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="text-sm font-semibold text-gray-500 mb-3">
                RECOGNIZED EXPRESSION
              </Text>
              <View className="bg-blue-50 p-4 rounded-lg">
                <Text className="text-gray-800 font-mono text-lg">
                  <MathJaxSvg fontSize={16}>{recognized}</MathJaxSvg>
                </Text>
              </View>
            </View>
          )}

          {latex && latex.length > 0 && (
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="text-sm font-semibold text-gray-500 mb-3">
                MATHEMATICAL STEPS
              </Text>
              <View className="space-y-3">
                {Array.isArray(latex) ? (
                  latex.map((expr, i) => (
                    <View key={i} className="bg-gray-50 p-4 rounded-lg">
                      <Text className="text-xs text-gray-500 mb-2">
                        Step {i + 1}
                      </Text>
                      <Text className="text-gray-800 font-mono">
                        <MathJaxSvg fontSize={16}>{expr}</MathJaxSvg>
                      </Text>
                    </View>
                  ))
                ) : (
                  <View className="bg-gray-50 p-4 rounded-lg">
                    <Text className="text-gray-800 font-mono">
                      {latex.replace(/\\\[|\\\]/g, "")}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {result && (
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="text-sm font-semibold text-gray-500 mb-3">
                FINAL RESULT
              </Text>
              <TouchableOpacity
                onPress={handleCopyResult}
                className="bg-green-50 p-4 rounded-lg border border-green-200"
                activeOpacity={0.7}
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-green-800 font-semibold text-xl">
                    {result}
                  </Text>
                  <Ionicons name="copy-outline" size={20} color="#166534" />
                </View>
                <Text className="text-green-600 text-xs mt-1">Tap to copy</Text>
              </TouchableOpacity>
            </View>
          )}
          {steps && steps.length > 0 && (
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="text-sm font-semibold text-gray-500 mb-3">
                SOLUTION EXPLANATION ({steps.length} steps)
              </Text>
              <View className="space-y-3">
                {steps.map((step, i) => (
                  <View key={i} className="flex-row">
                    <View className="bg-blue-500 w-6 h-6 rounded-full items-center justify-center mr-3 mt-1">
                      <Text className="text-white text-xs font-bold">
                        {i + 1}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-gray-700 leading-6">{step}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View className="space-y-3">
            <TouchableOpacity
              onPress={() => navigation.navigate("Calculator")}
              className="bg-light-primary rounded-xl p-4 flex-row items-center justify-center"
            >
              <Ionicons name="calculator-outline" size={20} color="black" />
              <Text className="text-back font-semibold ml-2">
                New Calculation
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalculationDetail;
