import type { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet } from "react-native";

import { colors, spacing } from "../theme/tokens";

export function Screen({ children }: PropsWithChildren) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1, padding: spacing.lg }
});
