/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { StyleSheet, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useGetComplaintByComplaintIdQuery } from "@/state/api/complaints";
import LoadingFull from "../LoadingFull";
import { BackgroundView, useThemeColor } from "../Themed";
import { Body1, Body2, SubHeading1, SubHeading2 } from "../StyledText";

import { ScrollView } from "react-native-gesture-handler";

const Timeline = ({ currentStatus = "New" }) => {
  const primary = useThemeColor({}, "primary");

  const statusLevels = [
    ["New"],
    ["In Progress"],
    ["Closed", "Cancelled", "Rejected"],
  ];
  const levelByStatus = statusLevels.reduce(
    (acc: { [key: string]: number }, level, index) => {
      level.forEach((status) => {
        acc[status] = index;
      });
      return acc;
    },
    {}
  );

  return (
    <View>
      {statusLevels
        .map((level) => level[0])
        .map((status, index) => {
          return (
            <View key={status} style={styles.timelineRow}>
              {index !== statusLevels.length - 1 && (
                <View
                  style={[
                    styles.timelineLine,
                    {
                      backgroundColor:
                        levelByStatus[status] <= levelByStatus[currentStatus]
                          ? primary
                          : "#d1d1d1",
                    },
                  ]}
                />
              )}
              <View
                style={[
                  styles.timelineDot,
                  {
                    backgroundColor:
                      levelByStatus[status] <= levelByStatus[currentStatus]
                        ? primary
                        : "#d1d1d1",
                  },
                ]}
              >
                {levelByStatus[status] > levelByStatus[currentStatus] && (
                  <View style={styles.timelineDotInner} />
                )}
              </View>
              {levelByStatus[status] === levelByStatus[currentStatus] ? (
                <Body1>{currentStatus}</Body1>
              ) : (
                <Body2>{status}</Body2>
              )}
            </View>
          );
        })}
    </View>
  );
};

const Details = () => {
  const { complaintId } = useLocalSearchParams();
  const {
    data: complaint = {},
    isLoading,
    isError,
  } = useGetComplaintByComplaintIdQuery(complaintId);

  return (
    <BackgroundView style={styles.container}>
      {isLoading && <LoadingFull />}
      <ScrollView>
        <View style={styles.card}>
          <SubHeading1>Complaint Details</SubHeading1>
          <View style={styles.cell}>
            <SubHeading2>ID</SubHeading2>
            <Body1>{complaint.id}</Body1>
          </View>
          <View style={styles.cell}>
            <SubHeading2>Type</SubHeading2>
            <Body1>{complaint.type}</Body1>
          </View>
          <View style={styles.cell}>
            <SubHeading2>Description</SubHeading2>
            <Body1>{complaint.problemDescription}</Body1>
          </View>
          <View style={styles.cell}>
            <SubHeading2>Location</SubHeading2>
            <Body1>{complaint.location}</Body1>
          </View>
          <View style={styles.cell}>
            <SubHeading2>Location details</SubHeading2>
            <Body1>{complaint.locationDescription}</Body1>
          </View>
          <View style={styles.cell}>
            <SubHeading2>Preferred time of availability</SubHeading2>
            <Body1>{complaint.timeOfAvailability}</Body1>
          </View>
        </View>
        <View style={styles.card}>
          <SubHeading1>Current Status</SubHeading1>
          <Timeline currentStatus={complaint.status} />
        </View>
        <View style={[styles.card, styles.last]}>
          <SubHeading1>Remarks</SubHeading1>
          <Body2>{complaint.remarks}</Body2>
        </View>
      </ScrollView>
    </BackgroundView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    flex: 1,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#fff",
    gap: 16,
  },
  last: {
    marginBottom: 16,
  },
  cell: {},

  timelineRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 2,
    gap: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 8,
    transform: [{ translateY: -2 }],

    alignItems: "center",
    justifyContent: "center",
  },
  timelineDotInner: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  timelineLine: {
    width: 2,
    height: "100%",
    position: "absolute",
    top: 16,
    left: 21,
  },
});
