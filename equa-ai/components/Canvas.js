import React from "react";
import { Svg, Path } from "react-native-svg";
import { View } from "react-native";
const Canvas = ({
  paths,
  currentPath,
  onTouchEnd,
  onTouchMove,
  width,
  height,
}) => {
  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderMove={onTouchMove}
      onResponderRelease={onTouchEnd}
      style={{
        height: height * 0.4,
        width: width,
        backgroundColor: "#b3b3b3ff",
      }}
    >
      <Svg height="100%" width="100%">
        {paths.map((p, index) => (
          <Path
            key={index}
            d={p.join(" ")}
            stroke="black"
            strokeWidth={3}
            fill="none"
          />
        ))}
        {currentPath.length > 0 && (
          <Path
            d={currentPath.join(" ")}
            stroke="black"
            strokeWidth={3}
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
};

export default Canvas;
