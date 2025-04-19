import api from "@/lib/api";

export interface MusicDNARequest {
  sequence: string;
}

export interface MusicDNAResponse {
  melody: string[];
}

export const generateMelody = async (
  sequence: string
): Promise<MusicDNAResponse> => {
  const response = await api.client.post<MusicDNAResponse>(
    api.endpoints.tools.musicdna,
    { sequence }
  );

  if (!response) {
    throw new Error("Failed to generate melody");
  }

  return response as MusicDNAResponse;
};
