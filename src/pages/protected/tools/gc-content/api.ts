import { GCContentRequest } from "./schema";
import { GCContentResponse } from "./types/gc-content";

export async function analyzeGCContent(data: GCContentRequest): Promise<GCContentResponse> {
    const response = await analyzeGCContent(data)
    return response;
}