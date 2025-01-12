import { pairwise_alignment } from '@/lib/services/tools/pairwise_alignment';
import { AlignmentRequest, AlignmentResponse } from './types';

export const alignSequences = async (data: AlignmentRequest): Promise<AlignmentResponse> => {

    const responseData: AlignmentResponse = await pairwise_alignment(data);
    console.log(responseData);
    if (responseData.error) {
        throw new Error(responseData.error);
    }

    return responseData;
};