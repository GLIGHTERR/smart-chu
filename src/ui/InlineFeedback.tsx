import { StyleSheet, Text, View } from "react-native";

type Props = { message: string; tone?: "error" | "info" };

export function InlineFeedback({ message, tone = "error" }: Props) {
  return <View accessibilityRole="alert" style={[styles.container, tone === "error" ? styles.error : styles.info]}><Text style={[styles.text, tone === "error" ? styles.errorText : styles.infoText]}>{message}</Text></View>;
}

const styles = StyleSheet.create({
  container: { borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11 },
  error: { backgroundColor: "#FFF0ED" },
  errorText: { color: "#A33A20" },
  info: { backgroundColor: "#FFF2DD" },
  infoText: { color: "#81500B" },
  text: { fontSize: 13, fontWeight: "600", lineHeight: 18 }
});
