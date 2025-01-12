import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SequenceInputProps {
    sequence: string;
    windowSize: number;
    onSequenceChange: (value: string) => void;
    onWindowSizeChange: (value: number) => void;
}

export function SequenceInput({
    sequence,
    windowSize,
    onSequenceChange,
    onWindowSizeChange
}: SequenceInputProps) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="sequence">DNA Sequence</Label>
                <Textarea
                    id="sequence"
                    placeholder="Enter DNA sequence or FASTA format..."
                    value={sequence}
                    onChange={(e) => onSequenceChange(e.target.value)}
                    className="h-32"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="windowSize">Window Size</Label>
                <Input
                    id="windowSize"
                    type="number"
                    min={1}
                    value={windowSize}
                    onChange={(e) => onWindowSizeChange(parseInt(e.target.value))}
                />
            </div>
        </div>
    );
}