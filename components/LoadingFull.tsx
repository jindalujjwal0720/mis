/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { useThemeColor, View } from "./Themed";

const LoadingFull = () => {
  const primary = useThemeColor({}, "primary");

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={primary} />
    </View>
  );
};

export default LoadingFull;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 10000,
    pointerEvents: "none",
  },
});
