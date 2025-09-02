import { View } from "react-native";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";

const Result = ({ result, height }) => {
  const equations = Array.isArray(result) ? result : [result];
  return (
    <View
      style={{
        height: height * 0.5,
        width: "100%",
        backgroundColor: "#c7c7c7ff",
      }}
    >
      {equations.map((equation, index) => (
        <MathJaxSvg key={index}>{String(equation)}</MathJaxSvg>
      ))}
    </View>
  );
};

export default Result;
