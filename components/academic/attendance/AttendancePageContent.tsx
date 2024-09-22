/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import PieChart from "react-native-pie-chart";
import {
  PrimaryText,
  SecondaryText,
  TertiaryText,
  useThemeColor,
} from "../../Themed";
import { View, Text } from "../../Themed";
import { Body1, Body2, SubHeading1, SubHeading2 } from "../../StyledText";
import { Link, router, useNavigation } from "expo-router";

interface AttendanceChartProps {
  present: number;
  absent: number;
  size?: number;
}

const AttendanceChart = ({
  present,
  absent,
  size = 50,
}: AttendanceChartProps) => {
  const colorSuccess = useThemeColor({}, "success");
  const colorDanger = useThemeColor({}, "danger");
  const colorBase = useThemeColor({}, "divider");

  return (
    <View style={styles.chartContainer}>
      <PieChart
        coverRadius={0.75}
        coverFill={"transparent"}
        widthAndHeight={size}
        series={[present, absent]}
        sliceColor={[
          (present / (present + absent)) * 100 >= 75
            ? colorSuccess
            : colorDanger,
          colorBase,
        ]}
      />
    </View>
  );
};

interface AttendanceCardProps {
  course: {
    code: string;
    name: string;
    present: number;
    absent: number;
    total: number;
  };
}

const AttendanceCard = ({ course }: AttendanceCardProps) => {
  const colorPrimary = useThemeColor({}, "primary");
  const colorBase = useThemeColor({}, "surface");

  const bottomStyle = [styles.bottom, { backgroundColor: colorBase }];
  const bottomCellTextStyle = [styles.bottomCellText, { color: colorPrimary }];

  const handlePress = () => {
    router.push(`/academic/attendance/${course.code}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.attendanceCard}>
        <View style={styles.attendanceCardTop}>
          <View style={styles.attendanceCardLeft}>
            <SubHeading1>{course.name}</SubHeading1>
            <SubHeading2>{course.code}</SubHeading2>
          </View>
          <View style={styles.attendanceCardRight}>
            <AttendanceChart present={course.present} absent={course.absent} />
          </View>
        </View>
        <View style={bottomStyle}>
          <View style={styles.bottomCell}>
            <TertiaryText>Present</TertiaryText>
            <Text style={bottomCellTextStyle}>{course.present}</Text>
          </View>
          <View style={styles.bottomCell}>
            <TertiaryText>Absent</TertiaryText>
            <Text style={bottomCellTextStyle}>{course.absent}</Text>
          </View>
          <View style={styles.bottomCell}>
            <TertiaryText>Total</TertiaryText>
            <Text style={bottomCellTextStyle}>{course.total}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const courses = [
  {
    code: "CSC305",
    name: "Computer Networks",
    present: 31,
    absent: 7,
    total: 38,
  },
  {
    code: "CSC306",
    name: "Software Engineering",
    present: 34,
    absent: 0,
    total: 34,
  },
  {
    code: "CSC307",
    name: "Computer Networks Lab",
    present: 12,
    absent: 0,
    total: 12,
  },
  {
    code: "CSC308",
    name: "Software Engineering Lab",
    present: 10,
    absent: 0,
    total: 10,
  },
  {
    code: "HSO308",
    name: "Social Psychology",
    present: 31,
    absent: 0,
    total: 31,
  },
  {
    code: "CSO501",
    name: "Principles of Articial Intelligence",
    present: 34,
    absent: 3,
    total: 37,
  },
  {
    code: "CSO507",
    name: "Deep Learning",
    present: 31,
    absent: 4,
    total: 35,
  },
  {
    code: "HSO512",
    name: "Experience Psychology",
    present: 31,
    absent: 1,
    total: 32,
  },
];

const AttendancePageContent = () => {
  const colorBackground = useThemeColor({}, "background");

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: colorBackground,
        },
      ]}
    >
      {courses.map((course, index) => (
        <AttendanceCard key={index} course={course} />
      ))}
      <View style={{ marginBottom: 16 }} />
    </ScrollView>
  );
};

export default AttendancePageContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  attendanceCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
  },
  attendanceCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 0,
    borderRadius: 16,
    gap: 16,
  },
  attendanceCardLeft: {
    flex: 1,
  },
  attendanceCardRight: {},

  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    gap: 16,
  },
  bottomCell: {
    flex: 1,
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingVertical: 16,
  },
  bottomCellText: {
    fontWeight: "bold",
  },
});
