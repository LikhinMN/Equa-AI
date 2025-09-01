import { View } from "react-native";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";
const Result = ({ result, height }) => {
  return (
    <View
      style={{
        height: height * 0.5,
        width: "100%",
        backgroundColor: "#c7c7c7ff",
      }}
    >
      {result.map((equation) => (
        <MathJaxSvg key={equation}>{equation}</MathJaxSvg>
      ))}
    </View>
  );
};

export default Result;
