import { AbsoluteFill, Img, staticFile } from 'remotion';

// Contact sheet built by Remotion itself (fallback when no full ffmpeg is installed):
// tiles public/_sheet/f#####.jpg frames into a labeled grid. `ar` is the frames' aspect (16/9 unless portrait footage).
export const SheetLab: React.FC<{ frames: number[]; cols: number; fps: number; ar?: number }> = ({ frames, cols, fps, ar = 16 / 9 }) => (
  <AbsoluteFill style={{ background: '#777', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', gap: 4, padding: 4 }}>
    {frames.map((fr) => (
      <div key={fr} style={{ position: 'relative', width: `calc((100% - ${(cols + 1) * 4}px) / ${cols})`, aspectRatio: String(ar) }}>
        <Img src={staticFile(`_sheet/f${String(fr).padStart(5, '0')}.jpg`)} style={{ width: '100%', height: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', left: 6, top: 6, padding: '2px 6px', background: 'rgba(0,0,0,0.6)', color: '#fff', font: '600 14px system-ui' }}>
          f{fr} · {(fr / fps).toFixed(2)}s
        </div>
      </div>
    ))}
  </AbsoluteFill>
);
