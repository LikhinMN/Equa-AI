import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useRef } from "react";
import Canvas from "./../components/Canvas.js";
import { captureRef } from "react-native-view-shot";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
const { width, height } = Dimensions.get("window");
const Home = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const canvasRef = useRef();
  const onTouchEnd = () => {
    if (currentPath.length > 0) {
      setPaths([...paths, currentPath]);
      setCurrentPath([]);
    }
  };

  const onTouchMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const newPoint = `${
      currentPath.length === 0 ? "M" : "L"
    }${locationX.toFixed(0)},${locationY.toFixed(0)}`;

    setCurrentPath([...currentPath, newPoint]);
  };

  return (
    <SafeAreaView
      className={`bg-light-background flex flex-1  items-center gap-4`}
    >
      <View ref={canvasRef} collapsable={false}>
        <Canvas
          paths={paths}
          currentPath={currentPath}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          height={height * 0.6}
          width={width * 0.9}
        />
      </View>
      <View className="flex gap-3">
        <TouchableOpacity
          onPress={() => {
            setPaths([]);
            setCurrentPath([]);
          }}
          style={{ width: width * 0.9 }}
          className="btn secondary-btn"
        >
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color="#0f0f0f"
          />
          <Text className="text">Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity className="btn primary-btn">
          <Octicons name="north-star" size={24} color="black" />
          <Text className="text">Calculate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
