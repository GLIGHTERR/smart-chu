import { Pressable, StyleSheet, Text } from "react-native";

import { colors, spacing } from "../theme/tokens";

type Props = { label: string; onPress: () => void; disabled?: boolean };

export function PrimaryButton({ label, onPress, disabled = false }: Props) {
  return (
    <Pressable disabled={disabled} onPress={onPress} style={[styles.button, disabled && styles.disabled]}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { alignItems: "center", backgroundColor: colors.primary, borderRadius: 12, padding: spacing.md },
  disabled: { opacity: 0.55 },
  label: { color: colors.surface, fontSize: 16, fontWeight: "700" }
});
