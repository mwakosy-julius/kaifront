import api, { apiLogger } from "@/lib/api";
import { AlignmentRequest, AlignmentResponse } from "@/pages/protected/tools/pairwise-alignment/types";

export const pairwise_alignment = async ( data: AlignmentRequest): Promise<AlignmentResponse> => {
    try {
        const response = await api.client.post<AlignmentRequest>(api.endpoints.tools.pairwise_alignment, data);
        return response as AlignmentResponse;
    } catch (error) {
        apiLogger.error('POST', api.endpoints.tools.pairwise_alignment, error as { response?: { status: number; data: unknown }; message: string; stack?: string });
        throw new Error('Failed to process alignment');
    }
};