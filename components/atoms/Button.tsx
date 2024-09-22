/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

import { useThemeColor } from "../Themed";

export type buttonProps = {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
} & React.ComponentProps<typeof Pressable>;

export function PrimaryButton(props: buttonProps) {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Pressable
      {...props}
      onPress={props.onPress}
      style={[styles.button, { backgroundColor: primaryColor }, props.style]}
    >
      <Text style={[styles.primaryButtonText, props.textStyle]}>
        {props.title}
      </Text>
    </Pressable>
  );
}

export function OutlineButton(props: buttonProps) {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Pressable
      {...props}
      onPress={props.onPress}
      style={[
        styles.button,
        {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: primaryColor,
        },
        props.style,
      ]}
    >
      <Text
        style={[
          styles.primaryButtonText,
          { color: primaryColor },
          props.textStyle,
        ]}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}

export function TextButton(props: buttonProps) {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Pressable
      {...props}
      onPress={props.onPress}
      style={[styles.textButton, props.style]}
    >
      <Text
        style={[
          styles.textButtonText,
          { color: primaryColor },
          props.textStyle,
        ]}
      >
        {props.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  textButton: {
    alignItems: "center",
  },
  textButtonText: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.4,
  },
});
