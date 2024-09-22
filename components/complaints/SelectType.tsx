/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import { StyleSheet } from "react-native";
import React from "react";
import { router } from "expo-router";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { Heading } from "../StyledText";
import { Text, View } from "../Themed";
import { BottomPrimaryButton } from "../molecules/BottomButton";

import {
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";

import {
  selectComplaintType,
  updateComplaintType,
} from "@/state/slices/complaintForm";
import { useDispatch, useSelector } from "react-redux";
import { useGetComplaintTypesQuery } from "@/state/api/complaints";
import LoadingFull from "../LoadingFull";

const SelectType = () => {
  const dispatch = useDispatch();
  const selectedComplaintType: string = useSelector(selectComplaintType);
  const {
    data: types = [],
    isLoading,
    isError,
  } = useGetComplaintTypesQuery({});

  const handleItemPress = (type: string) => {
    // update the form state
    dispatch(updateComplaintType(type));
  };

  const handleMoveNext = () => {
    if (!selectedComplaintType) {
      // show an error message
      return;
    }
    // navigate to the next screen
    console.log("Moving to the location screen");
    router.push("/complaints/new-complaint/select-location");
  };

  return (
    <View style={styles.container}>
      {isLoading && <LoadingFull />}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Heading>Choose the category under which your complaint falls</Heading>
        {isError && (
          <Text style={styles.error}>
            An error occurred. Please try again later.
          </Text>
        )}
        <View style={styles.grid}>
          {types
            ?.map((type: string) => {
              if (typeof type !== "string") return null;
              return {
                label: type.replace("_", " "),
                icon: icons[type],
              };
            })
            .filter((type: any) => type !== null)
            .map((type: any, index: number) => (
              <View
                key={index}
                style={[
                  styles.gridItem,
                  {
                    backgroundColor:
                      colors[index % colors.length].backgroundColor,
                  },
                  selectedComplaintType === type.label
                    ? {
                        borderWidth: 2,
                        borderColor: colors[index % colors.length].color,
                      }
                    : {},
                ]}
              >
                <TouchableOpacity
                  onPress={() => handleItemPress(type.label)}
                  style={styles.gridItemContent}
                >
                  <type.icon
                    size={24}
                    color={colors[index % colors.length].color}
                  />
                  <Text
                    style={[
                      styles.label,
                      {
                        color: colors[index % colors.length].color,
                      },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
      <BottomPrimaryButton
        title="Next"
        onPress={handleMoveNext}
        disabled={!selectedComplaintType}
      />
    </View>
  );
};

export default SelectType;

const createIcon = (name: string, IconSet: any) => {
  return ({ color, size }: any) => {
    return <IconSet name={name} size={size} color={color} />;
  };
};

const icons: Record<string, any> = {
  Civil: createIcon("home", Octicons),
  Electrical: createIcon("light-bulb", Octicons),
  Mess: createIcon("fast-food-outline", Ionicons),
  Internet: createIcon("web", MaterialCommunityIcons),
  Computer: createIcon("computer", MaterialIcons),
  UPS_Related: createIcon("ups", FontAwesome5),
  Telephone: createIcon("telephone", Foundation),
  Student_Contingency: createIcon("person", Octicons),
  Sanitary: createIcon("health-and-safety", MaterialIcons),
};

const colors = [
  {
    backgroundColor: "#ffefde",
    color: "#e6ac6d",
  },
  {
    backgroundColor: "#eef7f8",
    color: "#61bac4",
  },
  {
    backgroundColor: "#f2f6fe",
    color: "#6384c8",
  },
  {
    backgroundColor: "#fffde9",
    color: "#b4ad57",
  },
  {
    backgroundColor: "#fbf6f8",
    color: "#c3648a",
  },
  {
    backgroundColor: "#fef5f8",
    color: "#cd6286",
  },
  {
    backgroundColor: "#f1effb",
    color: "#6557ae",
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingBottom: 64,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  grid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 24,
    rowGap: 12,
  },
  gridItem: {
    width: "31%",
    height: "100%",
    maxHeight: 120,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    padding: 8,
    borderRadius: 16,
  },
  gridItemContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "center",
    marginTop: 8,
    textTransform: "capitalize",
  },
  icon: {
    marginBottom: 8,
  },
  error: {
    fontSize: 14,
    textAlign: "center",
  },
});
