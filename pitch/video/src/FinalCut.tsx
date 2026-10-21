// The whole video: Cherry's draft1 cut rebuilt from the rendered clips (src/edit.json), with the
// soundtrack (scripts/sound-design.mjs) under it. The clips keep their own sound (dialogue, Joule's voice).
import React from 'react';
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile, useVideoConfig } from 'remotion';
import EDIT from './edit.json';

export const FINAL_FRAMES = Math.round(EDIT.end * EDIT.fps);

export const FinalCut: React.FC = () => {
  const { fps } = useVideoConfig();
  const cuts = EDIT.cuts as [string, number, number, number][];
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {cuts.map(([id, e0, c0], k) => {
        const from = Math.round(e0 * fps);
        const to = k + 1 < cuts.length ? Math.round(cuts[k + 1][1] * fps) : FINAL_FRAMES;
        return (
          <Sequence key={id} from={from} durationInFrames={to - from}>
            <OffthreadVideo src={staticFile(`clips/${id}.mp4`)} startFrom={Math.round(c0 * fps)} style={{ width: '100%', height: '100%' }} />
          </Sequence>
        );
      })}
      <Audio src={staticFile('audio/soundtrack.wav')} />
    </AbsoluteFill>
  );
};
