import { describe, expect, it } from "vitest";

import { getEnvironment } from "../src/config/env";
import { validateCredentials } from "../src/validation/auth";

describe("auth validation", () => {
  it("requires a well-formed email and an eight-character password", () => {
    expect(validateCredentials({ email: "invalid", password: "short" })).toEqual({
      email: "Enter a valid email address.", password: "Password must be at least 8 characters."
    });
  });

  it("accepts valid credentials", () => {
    expect(validateCredentials({ email: "owner@example.com", password: "password" })).toEqual({});
  });
});

describe("environment", () => {
  it("removes a trailing slash from the API base URL", () => {
    expect(getEnvironment({ EXPO_PUBLIC_OWNER_API_BASE_URL: "https://api.example.com/" }).ownerApiBaseUrl).toBe("https://api.example.com");
  });
});
