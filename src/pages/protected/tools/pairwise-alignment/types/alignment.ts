export interface AlignmentResults {
    match_score: number;
    gap_open: number;
    gap_extend: number;
    alignment_score: number;
    similarity: number;
    sequence1_aligned: string;
    sequence2_aligned: string;
}

export interface AlignmentResponse {
    results: AlignmentResults;
    table: string;
    chart: string;
    alignment_type: string;
}

export interface AlignmentResultsProps {
    results: AlignmentResponse;
}

export interface SequenceTableProps {
    sequence1: string;
    sequence2: string;
}

export interface SequenceChartProps {
    sequence1: string;
    sequence2: string;
}