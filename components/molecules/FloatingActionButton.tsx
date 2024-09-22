/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useThemeColor } from "../Themed";

export type FloatingActionButtonProps = {
  icon: JSX.Element;
} & React.ComponentProps<typeof TouchableOpacity>;

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity
      style={[
        styles.fab,
        {
          backgroundColor: primaryColor,
        },
        props.style,
      ]}
      {...props}
      activeOpacity={0.7}
    >
      {React.cloneElement(props.icon, {
        style: [props.icon.props.style, styles.icon],
      })}
    </TouchableOpacity>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    zIndex: 1,
  },
  icon: {
    color: "white",
  },
});
