/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { StyleSheet } from "react-native";
import React from "react";
import { buttonProps, OutlineButton, PrimaryButton } from "../atoms/Button";
import { useThemeColor, View } from "../Themed";

export const BottomPrimaryButton = (props: buttonProps) => {
  const dividerColor = useThemeColor({}, "divider");

  return (
    <View style={[styles.bottom, { borderTopColor: dividerColor }]}>
      <PrimaryButton {...props} />
    </View>
  );
};

export const BottomOutlineButton = (props: buttonProps) => {
  const dividerColor = useThemeColor({}, "divider");

  return (
    <View style={[styles.bottom, { borderTopColor: dividerColor }]}>
      <OutlineButton {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    paddingTop: 8,
    borderTopWidth: 1,
  },
});
