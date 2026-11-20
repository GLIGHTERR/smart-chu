import { describe, expect, it } from "vitest";

import { maskEmail, nextRegistrationStep, previousRegistrationStep } from "../src/navigation/authNavigation";
import { validateOtp, validatePassword, validateProfile, validateRegistrationEmail } from "../src/validation/auth";

describe("registration navigation", () => {
  it("moves through each approved registration step and returns to login from the first step", () => {
    expect(nextRegistrationStep("email")).toBe("otp");
    expect(nextRegistrationStep("otp")).toBe("profile");
    expect(nextRegistrationStep("profile")).toBe("password");
    expect(nextRegistrationStep("password")).toBe("password");
    expect(previousRegistrationStep("email")).toBe("login");
    expect(previousRegistrationStep("otp")).toBe("email");
    expect(previousRegistrationStep("profile")).toBe("otp");
    expect(previousRegistrationStep("password")).toBe("profile");
  });

  it("masks a valid email but leaves incomplete input unchanged", () => {
    expect(maskEmail("owner@example.com")).toBe("ow***@example.com");
    expect(maskEmail("a@x.io")).toBe("a*@x.io");
    expect(maskEmail("not-an-email")).toBe("not-an-email");
  });
});

describe("registration validation", () => {
  it("requires a valid email and exactly six numeric OTP digits", () => {
    expect(validateRegistrationEmail("bad-email")).toEqual({ email: "Nhập địa chỉ email hợp lệ." });
    expect(validateRegistrationEmail("owner@example.com")).toEqual({});
    expect(validateOtp("12345")).toEqual({ otp: "Nhập mã xác thực gồm 6 chữ số." });
    expect(validateOtp("12345a")).toEqual({ otp: "Nhập mã xác thực gồm 6 chữ số." });
    expect(validateOtp("123456")).toEqual({});
  });

  it("requires a display name, permits an omitted phone, and enforces the password confirmation", () => {
    expect(validateProfile({ displayName: "  " })).toEqual({ displayName: "Nhập tên hiển thị." });
    expect(validateProfile({ displayName: "Minh Anh" })).toEqual({});
    expect(validatePassword({ password: "short", confirmPassword: "different" })).toEqual({ password: "Mật khẩu phải có ít nhất 8 ký tự.", confirmPassword: "Xác nhận mật khẩu chưa khớp." });
    expect(validatePassword({ password: "password", confirmPassword: "different" })).toEqual({ confirmPassword: "Xác nhận mật khẩu chưa khớp." });
    expect(validatePassword({ password: "password", confirmPassword: "password" })).toEqual({});
  });
});
