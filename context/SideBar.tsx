/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import React, { createContext, useContext } from "react";
import { Octicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

type Menu = {
  path: string;
  label: string;
  icon: any;
  children?: Menu[];
};

type SideBarContextType = {
  menu: Menu[];
};

const SideBarContext = createContext({} as SideBarContextType);

export const useSideBar = () => useContext(SideBarContext);

const createIcon =
  (name: string, Family: any) =>
  ({ color, size }: any) =>
    (
      <Family
        name={name}
        size={(size * 2) / 3}
        color={color}
        style={styles.icon}
      />
    );

const SideBarProvider = ({ children }: any) => {
  const menu = [
    {
      path: "index",
      label: "Home",
      icon: createIcon("home", Octicons),
    },
    {
      path: "academic",
      label: "Academic",
      icon: createIcon("book", Octicons),
      children: [
        {
          path: "academic/attendance",
          label: "Attendance",
        },
      ],
    },
    {
      path: "examination",
      label: "Examination",
      icon: createIcon("pencil", Octicons),
      children: [
        {
          path: "examination/hall-ticket",
          label: "Hall Ticket",
        },
        {
          path: "examination/marks",
          label: "Marks View",
        },
      ],
    },
    {
      path: "complaints/view-complaints",
      label: "My Complaints",
      icon: createIcon("customerservice", AntDesign),
    },
  ];

  const value = {
    menu,
  };

  return (
    <SideBarContext.Provider value={value as SideBarContextType}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;

const styles = StyleSheet.create({
  icon: {
    marginRight: -10,
  },
});
