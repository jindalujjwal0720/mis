/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { Image, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "../Themed";
import { useSelector } from "react-redux";
import { selectUser } from "@/state/slices/auth";

const ProfileDrawerHeader = () => {
  const user = useSelector(selectUser);
  const headerBackgroundUrl =
    "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk5Ni0wMDlfMS1rcm9pcjRkay5qcGc.jpg";

  return (
    <ImageBackground src={headerBackgroundUrl} style={styles.container}>
      <View style={styles.top}>
        <Image src={user?.imageURL} style={styles.avatar} />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
    </ImageBackground>
  );
};

export default ProfileDrawerHeader;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    height: 140,
    marginBottom: 4,
  },
  top: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  bottom: {
    justifyContent: "center",
    gap: 2,
    paddingBottom: 8,
    marginBottom: 16,
    backgroundColor: "transparent",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 32,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
});
