type Environment = {
  ownerApiBaseUrl: string;
};

export function getEnvironment(source = process.env): Environment {
  const ownerApiBaseUrl = source.EXPO_PUBLIC_OWNER_API_BASE_URL?.trim();

  if (!ownerApiBaseUrl) {
    throw new Error("EXPO_PUBLIC_OWNER_API_BASE_URL is required.");
  }

  return { ownerApiBaseUrl: ownerApiBaseUrl.replace(/\/$/, "") };
}
