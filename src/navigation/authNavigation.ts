export type AuthStep = "login" | "email" | "otp" | "profile" | "password" | "success";

const registrationSteps: AuthStep[] = ["email", "otp", "profile", "password"];

export function nextRegistrationStep(step: AuthStep): AuthStep {
  const index = registrationSteps.indexOf(step);
  return index >= 0 && index < registrationSteps.length - 1 ? registrationSteps[index + 1]! : step;
}

export function previousRegistrationStep(step: AuthStep): AuthStep {
  const index = registrationSteps.indexOf(step);
  return index > 0 ? registrationSteps[index - 1]! : "login";
}

export function maskEmail(email: string): string {
  const [local = "", domain = ""] = email.trim().split("@");
  if (!local || !domain) return email;
  return `${local.slice(0, 2)}${"*".repeat(Math.max(1, local.length - 2))}@${domain}`;
}
