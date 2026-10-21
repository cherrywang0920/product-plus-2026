import React from 'react';
import { Composition } from 'remotion';
import { SheetLab } from './SheetLab';
import { FinalCut, FINAL_FRAMES } from './FinalCut';
import { T } from './timing';
import { S01Hook, S04WalkOut, S11Data, S12Dashboard, S13End } from './shots/DeckShots';
import { S02Cmt, S03Pocket, S03Runner, S06EarIn, S06EarOut, S06Request, S07Stock, S08Ask, S08Yes, S09Long, S09Short } from './shots/FilmShots';

export const FPS = 25; // matches the footage

// One composition per shot: s<row>-<slug>. Film shots run the full take; the editor trims.
const SHOTS: [string, React.FC, number][] = [
  ['s01-hook', S01Hook, T.hook.dur],
  ['s02-cmt-no-alert', S02Cmt, T.s2.dur],
  ['s03a-runner-hands-full', S03Runner, T.s31.dur],
  ['s03b-pocket-0-notifications', S03Pocket, T.s32.dur],
  ['s04-walk-out-nothing-recorded', S04WalkOut, T.walk.dur],
  ['s06a-hey-brady', S06Request, T.s6.dur],
  ['s06b-ear-out', S06EarOut, T.s61.dur],
  ['s06c-ear-in-hey-joule', S06EarIn, T.s62.dur],
  ['s07-joule-stock', S07Stock, T.s7.dur],
  ['s08a-navy-okay', S08Ask, T.s81.dur],
  ['s08b-navy-perfect', S08Yes, T.s82.dur],
  ['s09a-handoff-long', S09Long, T.s91.dur],
  ['s09b-handoff-short', S09Short, T.s92.dur],
  ['s11-demand-data', S11Data, T.data.dur],
  ['s12-dashboard', S12Dashboard, T.dash.dur],
  ['s13-end', S13End, T.end.dur],
];

export const Root: React.FC = () => (
  <>
    {SHOTS.map(([id, C, dur]) => (
      <Composition key={id} id={id} component={C} durationInFrames={Math.floor(dur * FPS)} fps={FPS} width={1920} height={1080} />
    ))}
    <Composition id="final-cut" component={FinalCut} durationInFrames={FINAL_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="Sheet" component={SheetLab} durationInFrames={1} fps={FPS} width={1928} height={1200}
      defaultProps={{ frames: [] as number[], cols: 6, fps: FPS, ar: 16 / 9 }}
      calculateMetadata={({ props }) => ({ height: Math.ceil(props.frames.length / props.cols) * Math.round(((1928 - (props.cols + 1) * 4) / props.cols) / (props.ar ?? 16 / 9) + 4) + 4 })} />
  </>
);
