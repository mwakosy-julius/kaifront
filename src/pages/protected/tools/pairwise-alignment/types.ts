export interface AlignmentResults {
    match_score: number;
    gap_open: number;
    gap_extend: number;
    alignment_score: number;
    sequence1_aligned: string;
    sequence2_aligned: string;
}

export interface AlignmentResponse {
    results: AlignmentResults;
    table: string;
    chart: string;
    alignment_type: string;
    error?: string;
}

export interface AlignmentRequest {
    sequence1: string;
    sequence2: string;
    alignment_type: 'Global_Alignment' | 'Local_Alignment';
}

export interface AlignmentFormProps {
    onSubmit: (data: AlignmentRequest) => Promise<void>;
    loading: boolean;
}

export interface AlignmentResultsProps {
    results: AlignmentResponse;
}