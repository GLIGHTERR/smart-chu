import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { maskEmail, nextRegistrationStep, type AuthStep } from "../navigation/authNavigation";
import type { RegistrationValues } from "../types/auth";
import { InlineFeedback } from "../ui";
import { validateOtp, validatePassword, validateProfile, validateRegistrationEmail } from "../validation/auth";

const emptyRegistration: RegistrationValues = { confirmPassword: "", displayName: "", email: "", password: "", phone: "" };
type Errors = Partial<Record<keyof RegistrationValues | "otp", string>>;

export function AuthScreen() {
  const [step, setStep] = useState<AuthStep>("login");
  const [values, setValues] = useState(emptyRegistration);
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof RegistrationValues>(key: K, value: RegistrationValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function continueRegistration() {
    let nextErrors: Errors = {};
    if (step === "email") nextErrors = validateRegistrationEmail(values.email);
    if (step === "otp") nextErrors = validateOtp(otp);
    if (step === "profile") nextErrors = validateProfile(values);
    if (step === "password") nextErrors = validatePassword(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (step === "password") {
      // No account is created here; service integration owns the eventual success transition.
      setIsSubmitting(true);
      return;
    }
    setStep(nextRegistrationStep(step));
  }

  function switchToLogin() {
    setStep("login");
    setErrors({});
    setIsSubmitting(false);
  }

  return <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
    <View style={styles.orbLarge} /><View style={styles.orbSmall} />
    <View style={styles.brandRow}><View style={styles.brandMark}><Text style={styles.brandHouse}>S</Text></View><Text style={styles.brand}>SmartChủ</Text></View>
    {step === "login" ? <LoginView onRegister={() => setStep("email")} /> : null}
    {step === "email" ? <EmailView email={values.email} error={errors.email} onChange={(value) => update("email", value)} onContinue={continueRegistration} onLogin={switchToLogin} /> : null}
    {step === "otp" ? <OtpView email={values.email} error={errors.otp} otp={otp} onChange={(value) => { setOtp(value.replace(/[^0-9]/g, "").slice(0, 6)); setErrors((current) => ({ ...current, otp: undefined })); }} onContinue={continueRegistration} onEditEmail={() => setStep("email")} /> : null}
    {step === "profile" ? <ProfileView errors={errors} onChange={update} onContinue={continueRegistration} values={values} /> : null}
    {step === "password" ? <PasswordView errors={errors} isSubmitting={isSubmitting} onChange={update} onContinue={continueRegistration} values={values} /> : null}
  </ScrollView>;
}

function LoginView({ onRegister }: { onRegister: () => void }) {
  return <AuthCard eyebrow="Chào mừng trở lại" title="Đăng nhập để quản lý nhà trọ">
    <Field autoComplete="email" keyboardType="email-address" label="Email" placeholder="you@example.com" />
    <Field autoComplete="password" label="Mật khẩu" placeholder="Nhập mật khẩu" secureTextEntry />
    <Pressable accessibilityRole="link" style={styles.forgot}><Text style={styles.link}>Quên mật khẩu?</Text></Pressable>
    <ActionButton label="Đăng nhập" onPress={() => undefined} />
    <Text style={styles.accountPrompt}>Chưa có tài khoản? <Text accessibilityRole="link" onPress={onRegister} style={styles.link}>Đăng ký</Text></Text>
  </AuthCard>;
}

function EmailView({ email, error, onChange, onContinue, onLogin }: { email: string; error?: string; onChange: (value: string) => void; onContinue: () => void; onLogin: () => void }) {
  return <AuthCard eyebrow="Bước 1 / 4" title="Đăng ký tài khoản">
    <Text style={styles.description}>Dùng email để bắt đầu tạo tài khoản SmartChủ.</Text>
    <Field autoComplete="email" error={error} keyboardType="email-address" label="Email" onChangeText={onChange} placeholder="you@example.com" value={email} />
    <ActionButton label="Tiếp tục" onPress={onContinue} />
    <Text style={styles.accountPrompt}>Đã có tài khoản? <Text accessibilityRole="link" onPress={onLogin} style={styles.link}>Đăng nhập</Text></Text>
  </AuthCard>;
}

function OtpView({ email, error, otp, onChange, onContinue, onEditEmail }: { email: string; error?: string; otp: string; onChange: (value: string) => void; onContinue: () => void; onEditEmail: () => void }) {
  return <AuthCard eyebrow="Bước 2 / 4" title="Xác thực email">
    <View style={styles.destination}><Text style={styles.destinationLabel}>Mã xác thực đã được gửi tới</Text><Text style={styles.destinationEmail}>{maskEmail(email)}</Text><Text accessibilityRole="link" onPress={onEditEmail} style={styles.link}>Đổi email</Text></View>
    <Field error={error} keyboardType="number-pad" label="Mã xác thực gồm 6 số" maxLength={6} onChangeText={onChange} placeholder="• • • • • •" value={otp} />
    <ActionButton label="Xác nhận" onPress={onContinue} />
  </AuthCard>;
}

function ProfileView({ errors, onChange, onContinue, values }: { errors: Errors; onChange: <K extends keyof RegistrationValues>(key: K, value: RegistrationValues[K]) => void; onContinue: () => void; values: RegistrationValues }) {
  return <AuthCard eyebrow="Bước 3 / 4" title="Thông tin cá nhân">
    <Text style={styles.description}>Cho chúng tôi biết cách xưng hô với bạn.</Text>
    <Field error={errors.displayName} label="Tên hiển thị" onChangeText={(value) => onChange("displayName", value)} placeholder="Nguyễn Minh Anh" value={values.displayName} />
    <Field autoComplete="tel" keyboardType="phone-pad" label="Số điện thoại (không bắt buộc)" onChangeText={(value) => onChange("phone", value)} placeholder="090 000 0000" value={values.phone} />
    <ActionButton label="Tiếp tục" onPress={onContinue} />
  </AuthCard>;
}

function PasswordView({ errors, isSubmitting, onChange, onContinue, values }: { errors: Errors; isSubmitting: boolean; onChange: <K extends keyof RegistrationValues>(key: K, value: RegistrationValues[K]) => void; onContinue: () => void; values: RegistrationValues }) {
  return <AuthCard eyebrow="Bước 4 / 4" title="Tạo mật khẩu">
    <Text style={styles.description}>Mật khẩu tối thiểu 8 ký tự.</Text>
    <Field autoComplete="new-password" error={errors.password} label="Mật khẩu" onChangeText={(value) => onChange("password", value)} placeholder="Nhập mật khẩu" secureTextEntry value={values.password} />
    <Field autoComplete="new-password" error={errors.confirmPassword} label="Xác nhận mật khẩu" onChangeText={(value) => onChange("confirmPassword", value)} placeholder="Nhập lại mật khẩu" secureTextEntry value={values.confirmPassword} />
    {isSubmitting ? <InlineFeedback message="Thông tin đã sẵn sàng để gửi khi tích hợp dịch vụ đăng ký." tone="info" /> : null}
    <ActionButton disabled={isSubmitting} label={isSubmitting ? "Đang chuẩn bị..." : "Hoàn tất đăng ký"} onPress={onContinue} />
  </AuthCard>;
}

function AuthCard({ children, eyebrow, title }: { children: React.ReactNode; eyebrow: string; title: string }) {
  return <View style={styles.card}><Text style={styles.eyebrow}>{eyebrow}</Text><Text style={styles.title}>{title}</Text><View style={styles.fields}>{children}</View></View>;
}

function Field({ error, label, ...props }: React.ComponentProps<typeof TextInput> & { error?: string; label: string }) {
  return <View style={styles.field}><Text style={styles.label}>{label}</Text><TextInput autoCapitalize="none" placeholderTextColor="#A9947C" style={[styles.input, error && styles.inputError]} {...props} />{error ? <Text style={styles.fieldError}>{error}</Text> : null}</View>;
}

function ActionButton({ disabled = false, label, onPress }: { disabled?: boolean; label: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" disabled={disabled} onPress={onPress} style={[styles.button, disabled && styles.buttonDisabled]}>{disabled ? <ActivityIndicator color="#FFFFFF" /> : null}<Text style={styles.buttonLabel}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  accountPrompt: { color: "#765E45", fontSize: 14, lineHeight: 21, textAlign: "center" }, brand: { color: "#53310C", fontSize: 25, fontWeight: "800", letterSpacing: -0.7 }, brandHouse: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" }, brandMark: { alignItems: "center", backgroundColor: "#F7941D", borderRadius: 13, height: 34, justifyContent: "center", width: 34 }, brandRow: { alignItems: "center", flexDirection: "row", gap: 9, marginBottom: 36, zIndex: 1 },
  button: { alignItems: "center", backgroundColor: "#E76F14", borderRadius: 15, flexDirection: "row", gap: 9, minHeight: 52, justifyContent: "center", paddingHorizontal: 20 }, buttonDisabled: { opacity: 0.56 }, buttonLabel: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" }, card: { backgroundColor: "rgba(255,255,255,0.97)", borderColor: "rgba(151,81,12,0.10)", borderRadius: 28, borderWidth: 1, gap: 8, padding: 24, shadowColor: "#9A4B08", shadowOffset: { height: 14, width: 0 }, shadowOpacity: 0.12, shadowRadius: 30, zIndex: 1 }, description: { color: "#795F46", fontSize: 14, lineHeight: 21 }, destination: { backgroundColor: "#FFF4E5", borderRadius: 14, gap: 4, padding: 15 }, destinationEmail: { color: "#53310C", fontSize: 16, fontWeight: "800" }, destinationLabel: { color: "#795F46", fontSize: 13, lineHeight: 19 },
  eyebrow: { color: "#D9610B", fontSize: 12, fontWeight: "800", letterSpacing: 0.9, textTransform: "uppercase" }, field: { gap: 7 }, fieldError: { color: "#B64125", fontSize: 12, fontWeight: "600" }, fields: { gap: 17, marginTop: 17 }, forgot: { alignSelf: "flex-end", marginTop: -5 }, input: { backgroundColor: "#FFFDF9", borderColor: "#E7D5BF", borderRadius: 13, borderWidth: 1, color: "#392719", fontSize: 16, minHeight: 50, paddingHorizontal: 14 }, inputError: { borderColor: "#CB583E" }, label: { color: "#4E341F", fontSize: 14, fontWeight: "700" }, link: { color: "#D9610B", fontWeight: "800" },
  orbLarge: { backgroundColor: "#FFE2B7", borderRadius: 175, height: 350, position: "absolute", right: -180, top: -128, width: 350 }, orbSmall: { backgroundColor: "#F9C77D", borderRadius: 48, bottom: 40, height: 96, left: -52, opacity: 0.45, position: "absolute", width: 96 }, page: { backgroundColor: "#FFF9EF", flexGrow: 1, justifyContent: "center", padding: 24 }, title: { color: "#3E2919", fontSize: 29, fontWeight: "800", letterSpacing: -0.8, lineHeight: 35 }
});
