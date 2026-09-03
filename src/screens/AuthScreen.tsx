import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { PrimaryButton } from "../components/PrimaryButton";
import { colors, spacing } from "../theme/tokens";
import type { Credentials } from "../types/auth";
import { validateCredentials } from "../validation/auth";

type Props = { mode: "login" | "register"; onSubmit: (values: Credentials) => Promise<void>; onToggle: () => void };

export function AuthScreen({ mode, onSubmit, onToggle }: Props) {
  const [values, setValues] = useState<Credentials>({ email: "", password: "" });
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);
  const title = mode === "login" ? "Welcome back" : "Create your owner account";

  async function submit() {
    const errors = validateCredentials(values);
    const firstError = errors.email ?? errors.password;
    if (firstError) return setError(firstError);
    setPending(true);
    setError(undefined);
    try { await onSubmit(values); } catch (reason) { setError(reason instanceof Error ? reason.message : "Something went wrong."); }
    finally { setPending(false); }
  }

  return <View style={styles.content}>
    <Text style={styles.brand}>SMARTCHU</Text>
    <Text style={styles.title}>{title}</Text>
    <TextInput autoCapitalize="none" autoComplete="email" keyboardType="email-address" onChangeText={(email) => setValues({ ...values, email })} placeholder="Email" style={styles.input} value={values.email} />
    <TextInput autoComplete="password" onChangeText={(password) => setValues({ ...values, password })} placeholder="Password" secureTextEntry style={styles.input} value={values.password} />
    {error ? <Text style={styles.error}>{error}</Text> : null}
    <PrimaryButton disabled={pending} label={pending ? "Please wait..." : mode === "login" ? "Log in" : "Register"} onPress={submit} />
    <Text onPress={onToggle} style={styles.toggle}>{mode === "login" ? "Need an account? Register" : "Already registered? Log in"}</Text>
  </View>;
}

const styles = StyleSheet.create({
  brand: { color: colors.primary, fontSize: 14, fontWeight: "800", letterSpacing: 2 }, content: { flex: 1, gap: spacing.md, justifyContent: "center" }, error: { color: colors.danger }, input: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: 12, borderWidth: 1, padding: spacing.md }, title: { color: colors.text, fontSize: 30, fontWeight: "700" }, toggle: { color: colors.primary, textAlign: "center" }
});
