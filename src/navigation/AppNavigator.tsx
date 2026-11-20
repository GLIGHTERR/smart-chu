import { useState } from "react";

import type { OwnerApiClient } from "../api/ownerApi";
import type { SessionStore } from "../auth/sessionStore";
import { AuthScreen } from "../screens/AuthScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { Screen } from "../components/Screen";
import type { Credentials, Session } from "../types/auth";

type Props = { api: OwnerApiClient; session: Session | null; store: SessionStore; onSession: (session: Session) => void };

export function AppNavigator({ api, session, store, onSession }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  if (session) return <HomeScreen />;

  async function authenticate(credentials: Credentials) {
    const nextSession = mode === "login" ? await api.login(credentials) : await api.register(credentials);
    await store.write(nextSession);
    onSession(nextSession);
  }

  return <Screen><AuthScreen mode={mode} onSubmit={authenticate} onToggle={() => setMode(mode === "login" ? "register" : "login")} /></Screen>;
}
