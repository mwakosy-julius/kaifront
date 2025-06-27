import api from "@/lib/api";

export interface PrimerRequest {
  sequence: string;
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
    }>(api.endpoints.tools.primer_design, request);

    // if (!response.data) {
    //   throw new Error("No data returned from primer design API");
    // }
    const newResponse = response as {
      forward_gc: number;
      forward_primer: string;
      forward_tm: number;
      reverse_gc: number;
      reverse_primer: string;
      reverse_tm: number;
    };

    return {
      primers: [
        {
          sequence: newResponse.forward_primer,
          tm: newResponse.forward_tm,
          gc: newResponse.forward_gc,
          length: newResponse.forward_primer.length,
          type: "forward",
        },
        {
          sequence: newResponse.reverse_primer,
          tm: newResponse.reverse_tm,
          gc: newResponse.reverse_gc,
          length: newResponse.reverse_primer.length,
          type: "reverse",
        },
      ],
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || "Failed to design primers");
  }
};
