import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "../theme/tokens";

export function LoadingState() {
  return <View style={styles.center}><ActivityIndicator color={colors.primary} /></View>;
}

export function EmptyState({ message }: { message: string }) {
  return <View style={styles.center}><Text style={styles.message}>{message}</Text></View>;
}

export function ErrorState({ message }: { message: string }) {
  return <View style={styles.center}><Text style={[styles.message, styles.error]}>{message}</Text></View>;
}

const styles = StyleSheet.create({
  center: { alignItems: "center", flex: 1, justifyContent: "center", padding: spacing.lg },
  error: { color: colors.danger },
  message: { color: colors.mutedText, textAlign: "center" }
});
