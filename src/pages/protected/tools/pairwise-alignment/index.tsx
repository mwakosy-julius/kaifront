import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Dna } from 'lucide-react';
import { AlignmentForm } from './form';
import { AlignmentResults } from './results';
import { alignSequences } from './api';
import { AlignmentRequest, AlignmentResponse } from './types';

const PairwiseAlignment = () => {
    const [results, setResults] = useState<AlignmentResponse | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: AlignmentRequest) => {
        setLoading(true);
        setError('');

        try {
            const response = await alignSequences(data);
            setResults(response);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl">
            <Card className="bg-background/60 backdrop-blur-sm border-none shadow-none">
                <CardHeader>
                    <div className='flex w-full items-center gap-1 justify-between'>
                        <div className='flex flex-col gap-2'>
                            <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                                <Dna className="h-8 w-8" />
                                DNA Sequence Alignment Tool
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground">
                                Compare and analyze DNA sequences using global or local alignment algorithms
                            </CardDescription>
                        </div>

                        <div>
                            {results && <AlignmentResults results={results} />}
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <AlignmentForm onSubmit={handleSubmit} loading={loading} />

                    {error && (
                        <Alert variant="destructive" className="mt-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                </CardContent>

                <CardFooter className="text-sm text-muted-foreground">
                    <p className='text-sm'>
                        This tool supports DNA sequence alignment using both global and local alignment algorithms.
                        Enter your sequences using A, T, C, and G nucleotides.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default PairwiseAlignment;