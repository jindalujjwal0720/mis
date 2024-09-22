/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import React from "react";
import { Stack } from "expo-router";

const AuthRouter = () => {
  return (
    <Stack
      initialRouteName="auth/login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="auth/login"
        options={{
          title: "Login",
        }}
      />
    </Stack>
  );
};

export default AuthRouter;
