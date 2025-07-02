export interface AssemblyResult {
  assembled_sequence: string;
  fragment_count: number;
  min_overlap: number;
}

export class Assembly {
  static validateInputs(
    fragments: string[],
    minOverlap: number,
  ): { isValid: boolean; error: string } {
    if (fragments.length === 0 || fragments.some((f) => f.trim() === "")) {
      return {
        isValid: false,
        error: "Please provide at least one non-empty DNA fragment.",
      };
    }

    for (const fragment of fragments) {
      if (!/^[ATCGatcg]+$/.test(fragment)) {
        return {
          isValid: false,
          error: `Invalid DNA fragment: ${fragment}. Must contain only A, T, C, G.`,
        };
      }
    }

    if (minOverlap < 1) {
      return { isValid: false, error: "Minimum overlap must be at least 1." };
    }

    return { isValid: true, error: "" };
  }

  static async assembleFragments(
    fragments: string[],
    minOverlap: number,
  ): Promise<AssemblyResult> {
    const formData = new FormData();
    fragments.forEach((fragment, index) => {
      formData.append(`fragments[${index}]`, fragment.toUpperCase());
    });
    formData.append("min_overlap", minOverlap.toString());

    const response = await fetch("http://localhost:8000/assembly/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to assemble fragments");
    }

    return response.json();
  }

  static copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }
}
