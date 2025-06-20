import api from "@/lib/api";

export interface Mutation {
  position: number;
  from?: string;
  to?: string;
  inserted?: string;
  deleted?: string;
}

export interface MutationResult {
  original_sequence: string;
  mutated_sequence: string;
  mutations: Mutation[];
  mutation_count: number;
  error?: string;
}

export const mutateSequence = async (
  sequence: string,
  sequenceType: string,
  mutationType: string,
  mutationRate: number,
): Promise<MutationResult> => {
  try {
    const response = await api.client.post<MutationResult>(
      api.endpoints.tools.sequence_mutator,
      {
        sequence,
        sequence_type: sequenceType,
        mutation_type: mutationType,
        mutation_rate: mutationRate,
      },
    );

    if (!response) {
      throw new Error("No data returned from mutation API");
    }
    return response as MutationResult;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.detail || "Failed to mutate sequence",
    );
  }
};
