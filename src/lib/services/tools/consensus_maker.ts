import api from "@/lib/api";

export interface ConsensusRequest {
  data: string;
}

export interface ConsensusResponse {
  consensus: string;
}

export const generateConsensus = async (
  data: string
): Promise<ConsensusResponse> => {
  const response = await api.client.post<ConsensusResponse>(
    api.endpoints.tools.consensus_maker,
    {},
    {
      params: { data },
    }
  );

  if (!response) {
    throw new Error("Failed to generate consensus data");
  }

  return response as ConsensusResponse;
};
