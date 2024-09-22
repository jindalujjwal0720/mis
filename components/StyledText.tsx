import {
  PrimaryText,
  SecondaryText,
  TertiaryText,
  Text,
  TextProps,
} from "./Themed";
import { StyleSheet } from "react-native";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export function Heading(props: TextProps) {
  return <PrimaryText {...props} style={[props.style, styles.heading]} />;
}

export function SubHeading1(props: TextProps) {
  return <PrimaryText {...props} style={[props.style, styles.subHeading1]} />;
}

export function SubHeading2(props: TextProps) {
  return <TertiaryText {...props} style={[props.style, styles.subHeading2]} />;
}

export function Body1(props: TextProps) {
  return <PrimaryText {...props} style={[props.style, styles.body1]} />;
}

export function Body2(props: TextProps) {
  return <SecondaryText {...props} style={[props.style, styles.body2]} />;
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "MulishMedium",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
  },
  subHeading1: {
    fontFamily: "MulishMedium",
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0.15,

    marginBottom: 6,
  },
  subHeading2: {
    fontFamily: "MulishMedium",
    fontWeight: "600",
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.1,

    marginBottom: 6,
  },
  body1: {
    fontFamily: "Mulish",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,

    marginBottom: 6,
  },
  body2: {
    fontFamily: "Mulish",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,

    marginBottom: 6,
  },
});
