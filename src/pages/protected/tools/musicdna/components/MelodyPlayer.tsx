import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, FileText, FileAudio } from "lucide-react";

interface MelodyPlayerProps {
  melody: string[];
}

const notes = {
  C: 261.63,
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.0,
  A: 440.0,
  B: 493.88,
};

const MelodyPlayer: React.FC<MelodyPlayerProps> = ({ melody }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);
  const [currentSource, setCurrentSource] =
    useState<AudioBufferSourceNode | null>(null);
  const [progress, setProgress] = useState(0);
  const progressInterval = React.useRef<number | null>(null);

  useEffect(() => {
    const ctx = new AudioContext();
    setAudioContext(ctx);

    const sampleRate = 44100;
    const duration = 0.5;
    const frameCount = sampleRate * duration * melody.length;
    const audioBuffer = ctx.createBuffer(1, frameCount, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    let offset = 0;
    melody.forEach((note) => {
      const frequency = notes[note as keyof typeof notes];
      for (let i = 0; i < sampleRate * duration; i++) {
        const t = i / sampleRate;
        // Add decay to each note to make it sound more natural
        const amplitude = Math.exp(-5 * t) * 0.5;
        channelData[offset + i] =
          Math.sin(2 * Math.PI * frequency * t) * amplitude;
      }
      offset += sampleRate * duration;
    });

    setBuffer(audioBuffer);

    return () => {
      ctx.close();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [melody]);

  const playMelody = () => {
    if (!audioContext || !buffer) return;

    // Stop any currently playing source
    if (currentSource) {
      currentSource.stop();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    setIsPlaying(true);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);

    source.onended = () => {
      setIsPlaying(false);
      setProgress(0);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };

    setCurrentSource(source);
    source.start();

    // Update progress bar
    const totalDuration = buffer.duration * 1000; // in ms
    const startTime = Date.now();
    progressInterval.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(elapsed / totalDuration, 1);
      setProgress(newProgress);

      if (newProgress >= 1) {
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
      }
    }, 50);
  };

  const stopPlayback = () => {
    if (currentSource) {
      currentSource.stop();
      setCurrentSource(null);
      setIsPlaying(false);
      setProgress(0);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }
  };

  const exportWav = () => {
    if (!buffer) return;

    const sampleRate = 44100;
    const samples = buffer.getChannelData(0);
    const wavBuffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(wavBuffer);

    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    const floatTo16BitPCM = (
      output: DataView,
      offset: number,
      input: Float32Array
    ) => {
      if (!input.length) return; // Guard against empty input
      for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i])); // Clamp to [-1, 1]
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
    };

    // WAV header
    writeString(0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, 1, true); // AudioFormat (PCM)
    view.setUint16(22, 1, true); // NumChannels (mono)
    view.setUint32(24, sampleRate, true); // SampleRate
    view.setUint32(28, sampleRate * 2, true); // ByteRate
    view.setUint16(32, 2, true); // BlockAlign
    view.setUint16(34, 16, true); // BitsPerSample
    writeString(36, "data");
    view.setUint32(40, samples.length * 2, true); // Subchunk2Size

    // Write PCM data
    floatTo16BitPCM(view, 44, samples);

    const blob = new Blob([view], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dna_melody.wav";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const csv = ["Note\n", ...melody.map((note) => `${note}\n`)].join("");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dna_melody.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">Melody Player</CardTitle>
        <CardDescription>
          Listen to and download the DNA sequence melody
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {melody.map((note, index) => (
            <Badge key={index} variant="outline">
              {note}
            </Badge>
          ))}
        </div>

        <div className="w-full h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full transition-all bg-primary"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant={isPlaying ? "destructive" : "default"}
            onClick={isPlaying ? stopPlayback : playMelody}
            disabled={!audioContext || !buffer}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Play Melody
              </>
            )}
          </Button>

          <Button variant="outline" onClick={exportWav} disabled={!buffer}>
            <FileAudio className="w-4 h-4 mr-2" />
            Export WAV
          </Button>

          <Button variant="outline" onClick={exportCSV}>
            <FileText className="w-4 h-4 mr-2" />
            Export Notes (CSV)
          </Button>
        </div>

        {/* <div className="pt-2 text-sm text-muted-foreground">
          <p>
            This melody was generated by mapping DNA nucleotides to musical
            notes. The sequence creates a unique auditory representation of the
            DNA.
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default MelodyPlayer;
