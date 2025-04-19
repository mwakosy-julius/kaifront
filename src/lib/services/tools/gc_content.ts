import api, { apiLogger } from "@/lib/api";
import {
  GCContentInput,
  GCContentResponse,
} from "@/pages/protected/tools/gc-content/types/gc-content";

export async function analyzeGCContent(
  input: GCContentInput
): Promise<GCContentResponse> {
  try {
    const response = await api.client.post<GCContentInput>(
      api.endpoints.tools.gc_content,
      input
    );
    return response as GCContentResponse;
  } catch (error) {
    apiLogger.error(
      "POST",
      api.endpoints.tools.gc_content,
      error as {
        response?: { status: number; data: unknown };
        message: string;
        stack?: string;
      }
    );
    throw new Error("Failed to process GC content analysis");
  }
}
