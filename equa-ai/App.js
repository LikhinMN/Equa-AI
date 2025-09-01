import { StyleSheet, Text, View, Dimensions } from "react-native";
import { useState } from "react";
import Canvas from "./components/Canvas.js";
import Result from "./components/Result.js";
const { height, width } = Dimensions.get("window");
export default function App() {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [result, setResult] = useState([]);
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
    <View style={styles.container}>
      <Result height={height} width={width} result={result} />
      <Canvas
        paths={paths}
        currentPath={currentPath}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        height={height}
        width={width}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
