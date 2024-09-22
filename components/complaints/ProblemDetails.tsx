/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { TextInput, useThemeColor, View } from "../Themed";
import { BottomPrimaryButton } from "../molecules/BottomButton";
import Divider from "../atoms/Divider";
import { Body2, SubHeading1, SubHeading2 } from "../StyledText";
import { useDispatch, useSelector } from "react-redux";
import {
  discardForm,
  selectComplaintLocation,
  selectComplaintType,
  selectLocationDescription,
  selectProblemDescription,
  selectTimeOfAvailability,
  updateProblemDescription,
  updateTimeOfAvailability,
} from "@/state/slices/complaintForm";
import { useCreateComplaintMutation } from "@/state/api/complaints";
import LoadingFull from "../LoadingFull";

const ProblemDetails = () => {
  const primaryColor = useThemeColor({}, "primary");

  const dispatch = useDispatch();
  const selectedType = useSelector(selectComplaintType);
  const selectedLocation = useSelector(selectComplaintLocation);
  const locationDescription = useSelector(selectLocationDescription);
  const problemDescription = useSelector(selectProblemDescription);
  const timeOfAvailability = useSelector(selectTimeOfAvailability);

  const [createComplaint, { data, isSuccess, isLoading }] =
    useCreateComplaintMutation();

  const handleProblemDescChange = (value: string) => {
    // update the form state
    dispatch(updateProblemDescription(value));
  };

  const handleTimeOfAvailabilityChange = (value: string) => {
    // update the form state
    dispatch(updateTimeOfAvailability(value));
  };

  const handleSubmit = () => {
    if (!problemDescription || !timeOfAvailability) {
      // show an error message
      return;
    }
    console.log("Submitting the form");

    createComplaint({
      complaintType: selectedType,
      location: selectedLocation,
      locationDescription,
      problemDescription,
      timeOfAvailability,
    });

    // navigate to the next screen
    // reset the form state
    dispatch(discardForm());
  };

  useEffect(() => {
    if (!isSuccess) return;
    if (data.status === true) {
      console.log("Complaint submitted successfully");
      router.navigate("/complaints/view-complaints");
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingFull />}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.section, styles.field]}>
          <Body2 style={{ textTransform: "capitalize" }}>{selectedType}</Body2>
          <TouchableOpacity
            onPress={() => {
              router.navigate("/complaints/new-complaint");
            }}
          >
            <Body2 style={{ color: primaryColor }}>CHANGE</Body2>
          </TouchableOpacity>
        </View>
        <Divider height={10} />
        <View style={[styles.section, styles.field]}>
          <Body2 style={{ textTransform: "capitalize" }}>
            {selectedLocation}
          </Body2>
          <TouchableOpacity onPress={() => router.back()}>
            <Body2 style={{ color: primaryColor }}>CHANGE</Body2>
          </TouchableOpacity>
        </View>
        <Divider height={10} />
        <View style={styles.section}>
          <SubHeading1>Tell us your problem?</SubHeading1>
          <SubHeading2>
            Please provide a brief description of the problem
          </SubHeading2>
          <TextInput
            multiline
            numberOfLines={4}
            value={problemDescription}
            onChangeText={handleProblemDescChange}
            placeholder="Describe your problem here"
            style={styles.input}
          />
        </View>
        <Divider height={10} />
        <View style={styles.section}>
          <SubHeading1>When are you available?</SubHeading1>
          <SubHeading2>
            Please provide the time when you are available
          </SubHeading2>
          <TextInput
            multiline
            numberOfLines={2}
            value={timeOfAvailability}
            onChangeText={handleTimeOfAvailabilityChange}
            placeholder="e.g. weekdays after 6 PM, weekends, etc."
            style={styles.input}
          />
        </View>
      </ScrollView>
      <BottomPrimaryButton
        title="Submit"
        onPress={handleSubmit}
        disabled={!problemDescription || !timeOfAvailability}
      />
    </View>
  );
};

export default ProblemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingBottom: 64,
  },
  scrollContainer: {
    paddingHorizontal: 0,
  },

  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  input: {
    marginVertical: 16,
  },
});
