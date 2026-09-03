import type { Credentials, Session } from "../types/auth";

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

export class OwnerApiClient {
  constructor(private readonly baseUrl: string) {}

  async login(credentials: Credentials): Promise<Session> {
    return this.request<Session>("/owner/auth/login", { method: "POST", body: credentials });
  }

  async register(credentials: Credentials): Promise<Session> {
    return this.request<Session>("/owner/auth/register", { method: "POST", body: credentials });
  }

  private async request<T>(path: string, options: RequestOptions): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers: { Accept: "application/json", "Content-Type": "application/json", ...options.headers }
    });

    if (!response.ok) {
      throw new Error(`Owner API request failed (${response.status}).`);
    }

    return (await response.json()) as T;
  }
}
