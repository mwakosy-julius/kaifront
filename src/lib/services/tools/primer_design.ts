import api from "@/lib/api";

export interface PrimerRequest {
  sequence: string;
  primer_len?: number;
  tm_min?: number;
  tm_max?: number;
  gc_min?: number;
  gc_max?: number;
}

export interface Primer {
  sequence: string;
  tm: number;
  gc: number;
  length: number;
  type: "forward" | "reverse";
}

export interface PrimerResult {
  primers: Primer[];
}

export const primerDesign = async (
  request: PrimerRequest
): Promise<PrimerResult> => {
  try {
    const response = await api.client.post<{
      forward_gc: number;
      forward_primer: string;
      forward_tm: number;
      reverse_gc: number;
      reverse_primer: string;
      reverse_tm: number;
    }>(api.endpoints.tools.primer_design, {
      sequence: request.sequence,
      primer_len: request.primer_len ?? 20,
      tm_min: request.tm_min ?? 50,
      tm_max: request.tm_max ?? 65,
      gc_min: request.gc_min ?? 40,
      gc_max: request.gc_max ?? 60,
    });

    console.log("API Response:", response);

    const primers: Primer[] = [];
    if (
      response?.data &&
      response.data.forward_primer &&
      response.data.forward_tm &&
      response.data.forward_gc
    ) {
      primers.push({
        sequence: response.data.forward_primer,
        tm: response.data.forward_tm,
        gc: response.data.forward_gc,
        length: response.data.forward_primer.length,
        type: "forward",
      });
    }
    if (
      response?.data &&
      response.data.reverse_primer &&
      response.data.reverse_tm &&
      response.data.reverse_gc
    ) {
      primers.push({
        sequence: response.data.reverse_primer,
        tm: response.data.reverse_tm,
        gc: response.data.reverse_gc,
        length: response.data.reverse_primer.length,
        type: "reverse",
      });
    }

    return { primers };
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error);
    throw new Error(error.response?.data?.detail || "Failed to design primers");
  }
};
