/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import React from "react";
import { Stack } from "expo-router";

const NewComplaint = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="select-location" />
      <Stack.Screen name="describe-problem" />
    </Stack>
  );
};

export default NewComplaint;
