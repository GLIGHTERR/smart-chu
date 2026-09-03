import { useEffect, useMemo, useState } from "react";

import { OwnerApiClient } from "./src/api/ownerApi";
import { sessionStore } from "./src/auth/sessionStore";
import { ErrorState, LoadingState } from "./src/components/AppState";
import { Screen } from "./src/components/Screen";
import { getEnvironment } from "./src/config/env";
import { AppNavigator } from "./src/navigation/AppNavigator";
import type { Session } from "./src/types/auth";

export default function App() {
  const [session, setSession] = useState<Session | null>();
  const [startupError, setStartupError] = useState<string>();
  const config = useMemo(() => {
    try { return { environment: getEnvironment(), error: undefined }; }
    catch (error) { return { environment: undefined, error: error instanceof Error ? error.message : "Configuration error." }; }
  }, []);
  const api = useMemo(() => config.environment ? new OwnerApiClient(config.environment.ownerApiBaseUrl) : null, [config.environment]);

  useEffect(() => {
    sessionStore.read().then(setSession).catch(() => setStartupError("Unable to restore your secure session."));
  }, []);

  const visibleError = startupError ?? config.error;
  if (visibleError) return <Screen><ErrorState message={visibleError} /></Screen>;
  if (!api || session === undefined) return <Screen><LoadingState /></Screen>;
  return <Screen><AppNavigator api={api} session={session} store={sessionStore} onSession={setSession} /></Screen>;
}
