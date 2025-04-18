import React, { useState, useEffect } from 'react';

interface MelodyPlayerProps {
  melody: string[];
}

const notes = {
  C: 261.63,
  D: 293.66,
  E: 329.63,
  F: 349.23,
  G: 392.00,
  A: 440.00,
  B: 493.88,
};

const MelodyPlayer: React.FC<MelodyPlayerProps> = ({ melody }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);

  useEffect(() => {
    const ctx = new AudioContext();
    setAudioContext(ctx);

    const sampleRate = 44100;
    const duration = 0.5;
    const frameCount = sampleRate * duration * melody.length;
    const audioBuffer = ctx.createBuffer(1, frameCount, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    let offset = 0;
    melody.forEach(note => {
      const frequency = notes[note as keyof typeof notes];
      for (let i = 0; i < sampleRate * duration; i++) {
        const t = i / sampleRate;
        channelData[offset + i] = Math.sin(2 * Math.PI * frequency * t) * 0.5;
      }
      offset += sampleRate * duration;
    });

    setBuffer(audioBuffer);

    return () => {
      ctx.close();
    };
  }, [melody]);

  const playMelody = () => {
    if (!audioContext || !buffer) return;
    setIsPlaying(true);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.onended = () => setIsPlaying(false);
    source.start();
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

    const floatTo16BitPCM = (output: DataView, offset: number, input: Float32Array) => {
      if (!input.length) return; // Guard against empty input
      for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i])); // Clamp to [-1, 1]
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
    };

    // WAV header
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, 1, true); // AudioFormat (PCM)
    view.setUint16(22, 1, true); // NumChannels (mono)
    view.setUint32(24, sampleRate, true); // SampleRate
    view.setUint32(28, sampleRate * 2, true); // ByteRate
    view.setUint16(32, 2, true); // BlockAlign
    view.setUint16(34, 16, true); // BitsPerSample
    writeString(36, 'data');
    view.setUint32(40, samples.length * 2, true); // Subchunk2Size

    // Write PCM data
    floatTo16BitPCM(view, 44, samples);

    const blob = new Blob([view], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'melody.wav';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg backdrop-blur-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-300">Melody Player</h2>
      <p className="text-white mb-4">Notes: {melody.join(', ')}</p>
      <button
        className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50"
        onClick={playMelody}
        disabled={isPlaying || !audioContext || !buffer}
      >
        {isPlaying ? 'Playing...' : 'Play Melody'}
      </button>
      <button
        className="ml-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={exportWav}
        disabled={!buffer}
      >
        Export WAV
      </button>
      <button
        className="ml-4 px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition"
        onClick={() => {
          const csv = ['Note\n', ...melody.map(note => `${note}\n`)].join('');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'melody.csv';
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        Export CSV
      </button>
    </div>
  );
};

export default MelodyPlayer;