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
import { Play, Pause, FileAudio } from "lucide-react";

interface MelodyPlayerProps {
  melodyFreq: number[];
}

const MelodyPlayer: React.FC<MelodyPlayerProps> = ({ melodyFreq = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);
  const [currentSource, setCurrentSource] = useState<AudioBufferSourceNode | null>(null);
  const [progress, setProgress] = useState(0);
  const progressInterval = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const ctx = new AudioContext();
    setAudioContext(ctx);
    if (melodyFreq.length === 0) {
      console.warn("No melody frequencies provided. Cannot create audio buffer.");
      return;
    }


    const sampleRate = 44100;
    const durationPerNote = 0.5;
    const totalSamples = melodyFreq.length * Math.floor(sampleRate * durationPerNote);

    if (totalSamples <= 0) {
      console.error("Total samples calculated to 0. Cannot create audio buffer.");
      return;
    }
    const audioBuffer = ctx.createBuffer(1, totalSamples, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    let offset = 0;
    melodyFreq.forEach((freq) => {
      const wave = generateSineWave(freq, durationPerNote, sampleRate);
      channelData.set(wave, offset);
      offset += wave.length;
    });

    setBuffer(audioBuffer);

    return () => {
      ctx.close();
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [melodyFreq]);

  const playMelody = () => {
    if (!audioContext || !buffer) return;

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

    const totalDuration = buffer.duration * 1000; // in ms
    const startTime = Date.now();
    progressInterval.current = setInterval(() => {
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

    const sampleRate = buffer.sampleRate;
    const channelData = buffer.getChannelData(0);
    const wavBuffer = new ArrayBuffer(44 + channelData.length * 2);
    const view = new DataView(wavBuffer);

    const writeString = (offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    const floatTo16BitPCM = (output: DataView, offset: number, input: Float32Array) => {
      for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + channelData.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, channelData.length * 2, true);
    floatTo16BitPCM(view, 44, channelData);

    const blob = new Blob([view], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'melody.wav';
    a.click();
    URL.revokeObjectURL(url);
  };

  function generateSineWave(frequency: number, duration: number, sampleRate: number): Float32Array {
    const numSamples = Math.floor(sampleRate * duration);
    const wave = new Float32Array(numSamples);
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      wave[i] = Math.sin(2 * Math.PI * frequency * t);
    }
    return wave;
  }

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
          {melodyFreq.map((freq, index) => (
            <Badge key={index} variant="outline">
              {freq.toFixed(2)} Hz
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
        </div>
      </CardContent>
    </Card>
  );
};

export default MelodyPlayer;