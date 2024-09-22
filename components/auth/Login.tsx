/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { PrimaryText, Text, TextInput, useThemeColor, View } from "../Themed";
import { SubHeading2 } from "../StyledText";
import { PrimaryButton } from "../atoms/Button";

import { useLoginMutation } from "@/state/api/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/state/slices/auth";
import LoadingFull from "../LoadingFull";

const Login = () => {
  const errorColor = useThemeColor({}, "danger");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const [login, { data, isSuccess, error: loginError, isLoading }] =
    useLoginMutation();

  const handleLogin = async () => {
    console.log({ username, password });
    setError("");
    login({ username, password });
  };

  useEffect(() => {
    if (!isSuccess) return;
    if (data.status === true) {
      console.log("Login successful");
      console.log(data);
      const token = data.data.token;
      const user = data.data.user_details?.[0];
      console.log({ token, user });
      dispatch(setCredentials({ token, user }));
    } else {
      console.log("Login failed");
      setError(data.message);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!loginError) return;
    console.log("Login error: ", loginError);
    if ("data" in loginError) {
      setError((loginError.data as any).message);
    } else {
      setError("An error occurred. Please try again later.");
    }
  }, [loginError]);

  return (
    <>
      {isLoading && <LoadingFull />}
      <View style={styles.container}>
        <Image
          style={styles.logo}
          height={100}
          width={100}
          source={require("../../assets/images/iitism-logo.png")}
        />
        <View>
          <PrimaryText style={styles.heading}>Welcome</PrimaryText>
          <SubHeading2>Sign in to continue</SubHeading2>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="Username"
            onChangeText={(text: string) => setUsername(text)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={(text: string) => setPassword(text)}
            autoCapitalize="none"
          />
          {error && (
            <Text
              style={[
                styles.error,
                {
                  color: errorColor,
                },
              ]}
            >
              {error}
            </Text>
          )}
          <PrimaryButton
            title="Login"
            onPress={handleLogin}
            style={styles.submit}
          />
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    padding: 20,
    gap: 20,
  },
  logo: {
    alignSelf: "center",
    height: 110,
    width: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Mulish",
  },
  form: {},
  submit: {
    marginTop: 20,
  },
  error: {
    fontSize: 14,
    textAlign: "center",
  },
});
