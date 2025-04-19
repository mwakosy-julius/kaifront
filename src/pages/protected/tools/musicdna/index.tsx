import React, { useState, useEffect, useRef } from "react";
import { AxiosError } from "axios";
import { generateMelody } from "@/lib/services/tools/musicdna";
import * as Tone from "tone";
import SequenceInput from "./components/SequenceInput";
import MelodyPlayer from "./components/MelodyPlayer";
// import PianoRoll from "./components/PianoRoll";
// import "./App.css";

const MusicDNA: React.FC = () => {
  const [sequence, setSequence] = useState<string>("ATCGATCGATCG");
  const [melody, setMelody] = useState<string[]>([]);
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const synth = useRef<Tone.PolySynth | null>(null);
  // const sequenceIndex = useRef<number>(0);

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
    <div className="container p-6 mx-auto">
      <h1 className="mb-8 text-5xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text">
        Music DNA
      </h1>
      <SequenceInput
        sequence={sequence}
        setSequence={setSequence}
        onSubmit={handleSubmit}
      />
      {loading && (
        <p className="mt-4 text-center text-cyan-300">Generating melody...</p>
      )}
      {error && <p className="mt-4 text-center text-red-400">{error}</p>}
      {melody.length > 0 && (
        <div className="space-y-6">
          <MelodyPlayer melody={melody} />
          {/* <PianoRoll melody={melody} /> */}
        </div>
      )}
    </div>
  );
};

export default MusicDNA;
