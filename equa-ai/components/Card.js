import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
const Card = ({ item, index, onPress }) => {
  const { latex, result, recognized, steps } = item;
  const previewLatex = Array.isArray(latex) ? latex[0] : latex;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
      activeOpacity={0.7}
    >
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-sm font-semibold text-gray-500">
          Calculation #{index + 1}
        </Text>
        <View className="bg-blue-100 px-2 py-1 rounded-full">
          <Text className="text-xs text-blue-600 font-medium">
            Tap for details
          </Text>
        </View>
      </View>

      {/* Recognized expression */}
      {recognized && (
        <View className="mb-3">
          <Text className="text-xs font-medium text-gray-500 mb-1">
            RECOGNIZED
          </Text>
          <Text className="text-gray-800 font-mono bg-gray-50 px-3 py-2 rounded-lg">
            <MathJaxSvg fontSize={16}>{recognized}</MathJaxSvg>
          </Text>
        </View>
      )}

      {/* LaTeX preview */}
      <View className="mb-3">
        <Text className="text-xs font-medium text-gray-500 mb-1">
          EXPRESSION
        </Text>
        <Text className="text-gray-700 font-mono text-sm bg-blue-50 px-3 py-2 rounded-lg">
          {<MathJaxSvg fontSize={16}>{previewLatex}</MathJaxSvg> ||
            "No expression"}
        </Text>
      </View>

      {/* Result */}
      {result && (
        <View className="mb-3">
          <Text className="text-xs font-medium text-gray-500 mb-1">RESULT</Text>
          <Text className="text-green-700 font-semibold text-lg">
            <MathJaxSvg fontSize={16} color="#15803d">
              {result}
            </MathJaxSvg>
          </Text>
        </View>
      )}

      {/* Steps count */}
      {steps && steps.length > 0 && (
        <View className="flex-row items-center">
          <View className="bg-gray-100 px-2 py-1 rounded-full">
            <Text className="text-xs text-gray-600">
              {steps.length} solution step{steps.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Card;
