import React, { useState, useEffect, useRef } from "react";
import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Dna,
  Music,
  FileAudio,
  // Info,
  BookOpen,
  Share2,
} from "lucide-react";
import { generateMelody } from "@/lib/services/tools/musicdna";
import * as Tone from "tone";
import SequenceInput from "./components/SequenceInput";
import MelodyPlayer from "./components/MelodyPlayer";

const MusicDNA: React.FC = () => {
  const [sequence, setSequence] = useState<string>("ATCGATCGATCG");
  const [melody, setMelody] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const synth = useRef<Tone.PolySynth | null>(null);

  const stats = [
    {
      label: "Mapping",
      value: "DNA to Notes",
      icon: Dna,
    },
    {
      label: "Audio Format",
      value: "WAV & CSV",
      icon: FileAudio,
    },
    {
      label: "Visualization",
      value: "Piano Roll",
      icon: Music,
    },
  ];

  useEffect(() => {
    synth.current = new Tone.PolySynth(Tone.Synth).toDestination();
    return () => {
      if (synth.current) {
        synth.current.dispose();
      }
    };
  }, []);

  const handleSubmit = async () => {
    setError("");
    setMelody([]);
    setLoading(true);

    try {
      const response = await generateMelody(sequence);
      setMelody(response.melody);
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ detail: string }>;
      setError(
        axiosError.response?.data?.detail || "Failed to generate melody"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <Card className="border-none shadow-none bg-background/60 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-start justify-between w-full gap-1">
            <div className="flex flex-col gap-2">
              <CardTitle className="flex items-center gap-2 text-3xl font-bold text-primary">
                <Music className="w-8 h-8" />
                Music DNA
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Transform DNA sequences into unique musical melodies
              </CardDescription>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Documentation
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Share2 className="w-3 h-3 mr-1" />
                  Share Results
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Tool Statistics */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded bg-muted/50">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="p-3 rounded bg-primary/10">
                  <stat.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <SequenceInput
            sequence={sequence}
            setSequence={setSequence}
            onSubmit={handleSubmit}
            loading={loading}
          />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        {/* <CardFooter className="flex flex-col gap-2">
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 mt-0.5" />
            <div className="space-y-1">
              <p>
                This tool converts DNA sequences into musical notes, creating
                unique melodies based on nucleotide patterns. Each nucleotide is
                mapped to a specific musical note to create a biological
                soundscape.
              </p>
              <p>
                Input sequences should contain valid DNA nucleotides (A, T, G,
                C).
              </p>
            </div>
          </div>
        </CardFooter> */}
      </Card>

      {melody.length > 0 && <MelodyPlayer melody={melody} />}
    </div>
  );
};

export default MusicDNA;
