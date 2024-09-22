import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router } from "expo-router";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/state/slices/auth";

const HomePage = () => {
  const accessToken = useSelector(selectAccessToken);

  if (!accessToken) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <View>
      <Text>HomePage</Text>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
