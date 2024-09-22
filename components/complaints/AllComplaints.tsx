/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { StyleSheet } from "react-native";
import React from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

import {
  BackgroundView,
  TertiaryText,
  Text,
  useThemeColor,
  View,
} from "../Themed";
import FloatingActionButton from "../molecules/FloatingActionButton";
import Divider from "../atoms/Divider";
import { Body1, Body2 } from "../StyledText";
import { TextButton } from "../atoms/Button";
import { Complaint } from "@/models/Complaint";

import { useGetComplaintsQuery } from "@/state/api/complaints";
import LoadingFull from "../LoadingFull";

const statusColors: any = {
  New: {
    backgroundColor: "#dee8fd",
    color: "#3656c9",
    label: "New",
    icon: <FontAwesome name="dot-circle-o" size={14} color="#3656c9" />,
  },
  Rejected: {
    backgroundColor: "#ffe9e9",
    color: "#f44d4d",
    label: "Rejected",
    icon: <FontAwesome name="circle-o" size={14} color="#f44d4d" />,
  },
  Cancelled: {
    backgroundColor: "#ffe9e9",
    color: "#f44d4d",
    label: "Cancelled",
    icon: <FontAwesome name="circle-o" size={14} color="#f44d4d" />,
  },
  Closed: {
    backgroundColor: "#f0f9eb",
    color: "#2e8540",
    label: "Closed",
    icon: <FontAwesome name="check-circle" size={14} color="#2e8540" />,
  },
};

const ComplaintStatus = ({ status }: { status: string }) => {
  const statusColor = statusColors[status] || statusColors.New;
  return (
    <View
      style={[
        styles.status,
        {
          backgroundColor: statusColor.backgroundColor,
        },
      ]}
    >
      {statusColor.icon}
      <Text
        style={[
          styles.statusLabel,
          {
            color: statusColor.color,
          },
        ]}
      >
        {statusColor.label}
      </Text>
    </View>
  );
};

const ComplaintCard = (complaint: Complaint) => {
  const handleViewDetails = () => {
    console.log("Viewing complaint details: ", complaint.id);
    router.push(`/complaints/${complaint.id}`);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <ComplaintStatus status={complaint.status} />
        <TertiaryText>{complaint.id}</TertiaryText>
      </View>
      <View style={styles.cardContent}>
        <Body1
          style={{
            textTransform: "capitalize",
          }}
        >
          {complaint.complaintType}
        </Body1>
        <Body2>
          {complaint.problemDescription.length > 100
            ? complaint.problemDescription.slice(0, 100) + "..."
            : complaint.problemDescription}
        </Body2>
      </View>
      <View style={styles.cardFooter}>
        <TextButton title="View Details" onPress={handleViewDetails} />
      </View>
    </View>
  );
};

const AllComplaints = () => {
  const primaryColor = useThemeColor({}, "primary");
  const {
    data: complaints = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetComplaintsQuery({});

  const navigateToNewComplaint = () => {
    console.log("Navigating to new complaint screen");
    router.push("/complaints/new-complaint/");
  };

  return (
    <BackgroundView style={styles.container}>
      {isLoading && <LoadingFull />}
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[primaryColor]}
            refreshing={false}
            onRefresh={() => {
              console.log("Refreshing the complaints list");
              refetch();
            }}
          />
        }
      >
        {isError && complaints.length === 0 && (
          <Text style={styles.error}>
            Failed to load complaints, please try again later.
          </Text>
        )}
        {complaints.map((complaint: Complaint, index: number) => {
          return <ComplaintCard key={index} {...complaint} />;
        })}
        <View style={styles.last} />
      </ScrollView>
      <FloatingActionButton
        icon={<Entypo name="plus" size={24} />}
        onPress={navigateToNewComplaint}
      />
    </BackgroundView>
  );
};

export default AllComplaints;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    gap: 16,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  last: {
    backgroundColor: "transparent",
    marginBottom: 16,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContent: {},
  cardFooter: {
    alignItems: "flex-end",
    gap: 16,
    marginTop: -10,
  },

  status: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 8,
    alignItems: "center",
  },
  statusLabel: {
    fontSize: 12,
  },
  error: {
    fontSize: 14,
    textAlign: "center",
  },
});
