/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { Dropdown } from "react-native-element-dropdown";

import { BottomPrimaryButton } from "../molecules/BottomButton";
import { TextInput, useThemeColor, View } from "../Themed";
import { Body2, SubHeading1, SubHeading2 } from "../StyledText";
import Divider from "../atoms/Divider";

import { useDispatch, useSelector } from "react-redux";
import {
  selectComplaintLocation,
  selectComplaintType,
  selectLocationDescription,
  updateComplaintLocation,
  updateLocationDescription,
} from "@/state/slices/complaintForm";

const locations = [
  "NA for Student Contingency",
  "Department",
  "Office",
  "Residence",
  "Amber Hostel",
  "Diamond Hostel",
  "Emerald Hostel",
  "International Hostel",
  "Jasper Hostel",
  "JRF Hostel",
  "Opal Hostel",
  "Rosaline Hostel",
  "Ruby",
  "Ruby Annex",
  "Shanti Bhawan",
  "Sapphire Hostel",
  "Topaz Hostel",
  "SAH",
  "EDC",
];

const LocationDetails = () => {
  const tertiaryTextColor = useThemeColor({}, "tertiaryText");
  const borderColor = useThemeColor({}, "border");
  const primaryColor = useThemeColor({}, "primary");
  const dangerColor = useThemeColor({}, "danger");

  const dispatch = useDispatch();
  const selectedType = useSelector(selectComplaintType);
  const selectedLocation = useSelector(selectComplaintLocation);
  const locationDetails = useSelector(selectLocationDescription);

  const handleLocationChange = (value: string) => {
    // update the form state
    dispatch(updateComplaintLocation(value));
  };

  const handleLocationDetailsChange = (value: string) => {
    // update the form state
    dispatch(updateLocationDescription(value));
  };

  const handleMoveNext = () => {
    if (!selectedLocation) {
      // show an error message
      return;
    }
    // navigate to the next screen
    console.log("Moving to the problem screen");
    router.push("/complaints/new-complaint/describe-problem");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.section, styles.field]}>
          <Body2 style={{ textTransform: "capitalize" }}>{selectedType}</Body2>
          <TouchableOpacity onPress={() => router.back()}>
            <Body2 style={{ color: primaryColor }}>CHANGE</Body2>
          </TouchableOpacity>
        </View>
        <Divider height={10} />
        <View style={styles.section}>
          <SubHeading1>Tell us your location?</SubHeading1>
          <SubHeading2>
            Choose the location where the problem is happening
          </SubHeading2>
          <Dropdown
            data={locations.map((location) => ({
              label: location,
              value: location,
            }))}
            labelField="label"
            valueField="value"
            onChange={({ value }) => handleLocationChange(value)}
            value={selectedLocation}
            placeholder="Select Location"
            search={true}
            searchPlaceholder="Search Location"
            style={[styles.dropdown, { borderColor }]}
            placeholderStyle={{ color: tertiaryTextColor }}
            containerStyle={styles.dropdownContainer}
            inputSearchStyle={styles.dropdownSearch}
            itemTextStyle={styles.dropdownItemText}
          />
        </View>
        <Divider height={10} />
        <View style={styles.section}>
          <SubHeading1>Add details</SubHeading1>
          <SubHeading2>
            Add any additional details that you think are important for us to
            locate you
          </SubHeading2>
          <TextInput
            multiline
            numberOfLines={4}
            value={locationDetails}
            onChangeText={handleLocationDetailsChange}
            placeholder="You can add details like room number, floor, etc."
            style={styles.input}
          />
        </View>
      </ScrollView>
      <BottomPrimaryButton
        title="Next"
        onPress={handleMoveNext}
        disabled={!selectedLocation}
      />
    </View>
  );
};

export default LocationDetails;

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

  dropdown: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 16,
  },
  dropdownContainer: {
    borderRadius: 8,
  },
  dropdownSearch: {
    fontSize: 16,
    borderRadius: 6,
    fontFamily: "Mulish",
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: "Mulish",
  },

  input: {
    marginVertical: 16,
  },
});
