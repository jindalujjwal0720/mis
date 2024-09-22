/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import React from "react";
import { Drawer } from "expo-router/drawer";
import HomeDrawerContent from "../drawer/HomeDrawerContent";
import { useSideBar } from "@/context/SideBar";

const HomeRouter = () => {
  const { menu } = useSideBar();
  return (
    <Drawer
      initialRouteName="index"
      drawerContent={(props: any) => <HomeDrawerContent {...props} />}
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Mulish",
          fontSize: 18,
        },
      }}
    >
      {menu?.map((menuItem, menuItemIndex) => {
        if (menuItem.children) {
          return menuItem.children.map((child, index) => {
            return (
              <Drawer.Screen
                key={`${child.path}-${index}-${menuItemIndex}`}
                name={child.path}
                options={{
                  title: child.label,
                }}
              />
            );
          });
        } else {
          return (
            <Drawer.Screen
              key={`${menuItem.path}-${menuItemIndex}`}
              name={menuItem.path}
              options={{
                title: menuItem.label,
              }}
            />
          );
        }
      })}

      {/* Add hidden/inner screens here */}
      <Drawer.Screen
        name="complaints/new-complaint"
        options={{
          title: "Raise Complaint",
        }}
      />
      <Drawer.Screen
        name="complaints/[complaintId]"
        options={{
          title: "Complaint Details",
        }}
      />
    </Drawer>
  );
};

export default HomeRouter;
