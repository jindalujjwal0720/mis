/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

import { Calendar } from "react-native-calendars";
import { useThemeColor } from "@/components/Themed";
import { Body1, Body2, Heading, SubHeading2 } from "@/components/StyledText";
import { View } from "@/components/Themed";

interface AggregateDetail {
  [date: string]: {
    present: number;
    absent: number;
  };
}

const details = {
  name: "Computer Networks",
  code: "CSC305",
  present: 31,
  absent: 7,
  dates: [
    {
      date: "05-01-2024",
      status: "P",
    },
    {
      date: "08-01-2024",
      status: "P",
    },
    {
      date: "10-01-2024",
      status: "P",
    },
    {
      date: "12-01-2024",
      status: "P",
    },
    {
      date: "15-01-2024",
      status: "P",
    },
    {
      date: "17-01-2024",
      status: "P",
    },
    {
      date: "19-01-2024",
      status: "P",
    },
    {
      date: "24-01-2024",
      status: "P",
    },
    {
      date: "29-01-2024",
      status: "P",
    },
    {
      date: "31-01-2024",
      status: "P",
    },
    {
      date: "31-01-2024",
      status: "P",
    },
    {
      date: "01-02-2024",
      status: "P",
    },
    {
      date: "05-02-2024",
      status: "P",
    },
    {
      date: "07-02-2024",
      status: "P",
    },
    {
      date: "09-02-2024",
      status: "P",
    },
    {
      date: "12-02-2024",
      status: "P",
    },
    {
      date: "16-02-2024",
      status: "P",
    },
    {
      date: "19-02-2024",
      status: "P",
    },
    {
      date: "21-02-2024",
      status: "P",
    },
    {
      date: "23-02-2024",
      status: "A",
    },
    {
      date: "06-03-2024",
      status: "A",
    },
    {
      date: "06-03-2024",
      status: "A",
    },
    {
      date: "11-03-2024",
      status: "P",
    },
    {
      date: "13-03-2024",
      status: "P",
    },
    {
      date: "15-03-2024",
      status: "P",
    },
    {
      date: "16-03-2024",
      status: "P",
    },
    {
      date: "18-03-2024",
      status: "P",
    },
    {
      date: "20-03-2024",
      status: "P",
    },
    {
      date: "22-03-2024",
      status: "P",
    },
    {
      date: "01-04-2024",
      status: "P",
    },
    {
      date: "03-04-2024",
      status: "P",
    },
    {
      date: "05-04-2024",
      status: "A",
    },
    {
      date: "06-04-2024",
      status: "P",
    },
    {
      date: "06-04-2024",
      status: "A",
    },
    {
      date: "08-04-2024",
      status: "P",
    },
    {
      date: "08-04-2024",
      status: "P",
    },
    {
      date: "10-04-2024",
      status: "A",
    },
    {
      date: "17-04-2024",
      status: "A",
    },
  ],
};

const AttendanceDetails = () => {
  const { courseCode } = useLocalSearchParams();

  const colorPrimary = useThemeColor({}, "primary");
  const colorSuccess = useThemeColor({}, "success");
  const colorDanger = useThemeColor({}, "danger");
  const colorBackground = useThemeColor({}, "background");

  const aggregateDetailsByDate: AggregateDetail = details?.dates?.reduce(
    (acc: any, detail) => {
      if (!acc[detail.date]) {
        acc[detail.date] = {
          present: 0,
          absent: 0,
        };
      }

      if (detail.status === "P") {
        acc[detail.date].present++;
      } else {
        acc[detail.date].absent++;
      }

      return acc;
    },
    {}
  );

  const generateDots = (present: number, absent: number) => {
    const dots = [];
    for (let i = 0; i < present; i++) {
      dots.push({
        key: `present-${i}`,
        color: colorSuccess,
      });
    }
    for (let i = 0; i < absent; i++) {
      dots.push({
        key: `absent-${i}`,
        color: colorDanger,
      });
    }
    return dots;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorBackground,
        },
      ]}
    >
      <View style={styles.card}>
        <Heading>{details.name}</Heading>
        <SubHeading2>{details.code}</SubHeading2>
        <View style={styles.itemRow}>
          <Body2>Present</Body2>
          <Body1>{details.present}</Body1>
        </View>
        <View style={styles.itemRow}>
          <Body2>Absent</Body2>
          <Body1>{details.absent}</Body1>
        </View>
      </View>
      <Calendar
        style={styles.calendar}
        theme={{
          arrowColor: colorPrimary,
          todayTextColor: colorPrimary,
        }}
        hideExtraDays
        markingType="multi-dot"
        markedDates={Object.keys(aggregateDetailsByDate).reduce(
          (acc: any, date) => {
            const reverseDate = date.split("-").reverse().join("-");
            acc[reverseDate] = {
              marked: true,
              dots: generateDots(
                aggregateDetailsByDate[date].present,
                aggregateDetailsByDate[date].absent
              ),
            };
            return acc;
          },
          {}
        )}
      />
    </View>
  );
};

export default AttendanceDetails;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    gap: 8,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  calendar: {
    width: "100%",
    padding: 8,
    borderRadius: 16,
  },
});
