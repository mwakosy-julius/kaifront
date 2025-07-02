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
  request: PrimerRequest,
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
    if (response.forward_primer && response.forward_tm && response.forward_gc) {
      primers.push({
        sequence: response.forward_primer,
        tm: response.forward_tm,
        gc: response.forward_gc,
        length: response.forward_primer.length,
        type: "forward",
      });
    }
    if (response.reverse_primer && response.reverse_tm && response.reverse_gc) {
      primers.push({
        sequence: response.reverse_primer,
        tm: response.reverse_tm,
        gc: response.reverse_gc,
        length: response.reverse_primer.length,
        type: "reverse",
      });
    }

    return { primers };
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error);
    throw new Error(error.response?.data?.detail || "Failed to design primers");
  }
};
