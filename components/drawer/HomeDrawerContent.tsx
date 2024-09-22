/**
 * ©2024, Ujjwal Jindal, Batch 2025, CSE - IIT (ISM) Dhanbad
 */

import React, { useState } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { useSideBar } from "@/context/SideBar";
import { SafeAreaView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Text, View } from "../Themed";
import ProfileDrawerHeader from "./ProfileDrawerHeader";

const HomeDrawerContent = (props: any) => {
  const router = useRouter();
  const [selectedScreen, setSelectedScreen] = useState("index");
  const { menu } = useSideBar();

  const handleMenuItemPress = (menuItem: any) => {
    if (selectedScreen === menuItem.path) {
      if (menuItem.children) {
        return setSelectedScreen("");
      }
    } else if (menuItem.children) {
      setSelectedScreen(menuItem.path);
      return;
    } else if (menuItem.path === "index") {
      setSelectedScreen("index");
      return router.navigate("/");
    } else {
      setSelectedScreen(menuItem.path);
    }
    console.log(menuItem);
    router.navigate(menuItem.path);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
    >
      <SafeAreaView>
        <ProfileDrawerHeader />
        {menu?.map((menuItem, menuIndex) => {
          return (
            <React.Fragment key={`${menuItem.path}-${menuIndex}`}>
              <DrawerItem
                label={menuItem.label}
                onPress={() => handleMenuItemPress(menuItem)}
                icon={menuItem.icon}
                focused={selectedScreen === menuItem.path}
              />
              {menuItem.children &&
                selectedScreen === menuItem.path &&
                menuItem.children.map((child, index) => {
                  return (
                    <DrawerItem
                      key={`${child.path}-${index}-${menuIndex}`}
                      label={child.label}
                      onPress={() => {
                        router.navigate(child.path);
                      }}
                      style={styles.subItem}
                      focused={selectedScreen === child.path}
                    />
                  );
                })}
            </React.Fragment>
          );
        })}
      </SafeAreaView>
      <TouchableOpacity style={styles.fixedBottom}>
        <View>
          <Text>Fixed Bottom</Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default HomeDrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  subItem: {
    marginLeft: 48,
  },
  fixedBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
});
