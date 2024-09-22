/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function PrimaryText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primaryText"
  );

  return (
    <DefaultText
      style={[{ color, fontFamily: "Mulish" }, style]}
      {...otherProps}
    />
  );
}

export function SecondaryText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondaryText"
  );

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TertiaryText(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tertiaryText"
  );

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "surface"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function BackgroundView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: any) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const primaryColor = useThemeColor({}, "primary");
  const tertiaryTextColor = useThemeColor({}, "tertiaryText");
  const borderColor = useThemeColor({}, "border");

  return (
    <DefaultTextInput
      style={[
        {
          color,
          fontSize: 16,
          lineHeight: 24,
          letterSpacing: 0.5,
          borderRadius: 8,
          borderWidth: 1,
          borderColor,
          marginVertical: 12,
          padding: 12,
          fontFamily: "Mulish",
          verticalAlign: props?.multiline ? "top" : "middle",
        },
        style,
      ]}
      placeholderTextColor={tertiaryTextColor}
      selectionColor={primaryColor}
      {...otherProps}
    />
  );
}
