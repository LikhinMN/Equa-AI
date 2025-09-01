import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
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
  const handleCalculate = () => {
    //todo
  };
  return (
    <View style={styles.container}>
      <Result height={height} width={width} result={result} />

      <Canvas
        paths={paths}
        currentPath={currentPath}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        height={height * 0.6}
        width={width * 0.9}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={() => {
            setPaths([]);
            setCurrentPath([]);
          }}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.calculateButton]}
          onPress={handleCalculate}
        >
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc", // light gray background
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButton: {
    backgroundColor: "#ef4444",
  },
  calculateButton: {
    backgroundColor: "#3b82f6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
