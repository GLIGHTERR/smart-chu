import * as SecureStore from "expo-secure-store";

import type { Session } from "../types/auth";

const SESSION_KEY = "smart-chu.session";

export interface SessionStore {
  clear(): Promise<void>;
  read(): Promise<Session | null>;
  write(session: Session): Promise<void>;
}

export const sessionStore: SessionStore = {
  async clear() {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  },
  async read() {
    const value = await SecureStore.getItemAsync(SESSION_KEY);
    return value ? (JSON.parse(value) as Session) : null;
  },
  async write(session) {
    await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
  }
};
