/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { View } from "react-native";
import React from "react";
import { useThemeColor } from "../Themed";

export type DividerProps = {
  height?: number;
} & View["props"];

const Divider = (props: DividerProps) => {
  const dividerColor = useThemeColor({}, "divider");

  return (
    <View
      style={[
        {
          backgroundColor: dividerColor,
          height: props.height || 1,
          width: "100%",
        },
        props.style,
      ]}
    />
  );
};

export default Divider;
