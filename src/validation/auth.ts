import type { Credentials } from "../types/auth";

export type FieldErrors = Partial<Record<keyof Credentials, string>>;

export function validateCredentials(values: Credentials): FieldErrors {
  const errors: FieldErrors = {};
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.password.length < 8) errors.password = "Password must be at least 8 characters.";
  return errors;
}
