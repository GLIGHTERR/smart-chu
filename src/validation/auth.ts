import type { Credentials, RegistrationValues } from "../types/auth";

export type FieldErrors = Partial<Record<keyof Credentials, string>>;

export function validateCredentials(values: Credentials): FieldErrors {
  const errors: FieldErrors = {};
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.password.length < 8) errors.password = "Password must be at least 8 characters.";
  return errors;
}

export type RegistrationFieldErrors = Partial<Record<keyof RegistrationValues, string>>;

export function validateRegistrationEmail(email: string): RegistrationFieldErrors {
  return /^\S+@\S+\.\S+$/.test(email) ? {} : { email: "Nhập địa chỉ email hợp lệ." };
}

export function validateOtp(otp: string): { otp?: string } {
  return /^\d{6}$/.test(otp) ? {} : { otp: "Nhập mã xác thực gồm 6 chữ số." };
}

export function validateProfile(values: Pick<RegistrationValues, "displayName">): RegistrationFieldErrors {
  return values.displayName.trim() ? {} : { displayName: "Nhập tên hiển thị." };
}

export function validatePassword(values: Pick<RegistrationValues, "password" | "confirmPassword">): RegistrationFieldErrors {
  const errors: RegistrationFieldErrors = {};
  if (values.password.length < 8) errors.password = "Mật khẩu phải có ít nhất 8 ký tự.";
  if (values.confirmPassword !== values.password) errors.confirmPassword = "Xác nhận mật khẩu chưa khớp.";
  return errors;
}
