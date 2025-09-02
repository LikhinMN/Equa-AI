import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import Result from "./components/Result.js";
import { useState, useRef } from "react";
import Canvas from "./components/Canvas.js";
import { captureRef } from "react-native-view-shot";

const { height, width } = Dimensions.get("window");

export default function App() {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [result, setResult] = useState(["\\[ x+1 \\]", "\\[ y^2 \\]"]);
  const [previous, setPrevious] = useState([]); // ✅ Added missing state
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

  const sendImage = async () => {
    try {
      // ✅ Capture canvas as base64
      const uri = await captureRef(canvasRef, {
        format: "png",
        quality: 1,
      });

      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "image/png",
        name: "equation.png",
      });
      formData.append("previous", JSON.stringify(previous));

      const res = await fetch(
        " https://4a9356cc3c53.ngrok-free.app/solve-image",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.latex) {
        setResult(data.latex);
        setPrevious((prev) => [...prev, data.latex]);
      } else {
        Alert.alert("Error", data.error || "Something went wrong");
      }
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Result result={result} />
      <View ref={canvasRef} collapsable={false}>
        <Canvas
          paths={paths}
          currentPath={currentPath}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          height={height * 0.6}
          width={width * 0.9}
          result={result}
        />
      </View>

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
          onPress={sendImage}
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
    backgroundColor: "#f8fafc",
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
