export interface FileData {
  filename: string;
  content: string;
}

export interface QCResult {
  reportHtml: string;
  files: FileData[];
}

export class QualityControl {
  static validateInputs(
    dataType: string,
    file1: File | null,
    file2: File | null,
  ): { isValid: boolean; error: string } {
    if (!file1) {
      return { isValid: false, error: "Please upload the first FASTQ file." };
    }

    if (!file1.name.endsWith(".fastq") && !file1.name.endsWith(".fq")) {
      return {
        isValid: false,
        error: "First file must have .fastq or .fq extension.",
      };
    }

    if (dataType === "paired-end") {
      if (!file2) {
        return {
          isValid: false,
          error:
            "Please upload the second FASTQ file for paired-end processing.",
        };
      }
      if (!file2.name.endsWith(".fastq") && !file2.name.endsWith(".fq")) {
        return {
          isValid: false,
          error: "Second file must have .fastq or .fq extension.",
        };
      }
    }

    if (dataType !== "single-end" && dataType !== "paired-end") {
      return {
        isValid: false,
        error: "Invalid data type. Use single-end or paired-end.",
      };
    }

    return { isValid: true, error: "" };
  }

  static async processFastq(
    dataType: string,
    file1: File,
    file2?: File,
  ): Promise<QCResult> {
    const formData = new FormData();
    formData.append("data_type", dataType);
    formData.append("file1", file1);
    if (file2) {
      formData.append("file2", file2);
    }

    const response = await fetch("http://localhost:8000/process-fastq/", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to process files");
    }

    return response.json();
  }

  static downloadFile(filename: string, base64Content: string): void {
    const byteCharacters = atob(base64Content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
}
