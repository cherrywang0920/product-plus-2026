// Every colour and font in the video comes from here, matched to our PDF brief (SAP-style blues).
// Accents, each with one meaning for the whole video:
//   blue = Atelier / Joule did this (routed, logged, answered)
//   red  = the problem (no alert, lost, nothing recorded), used sparingly like SAP's "negative"
// Fonts match the brief: Plus Jakarta Sans for titles and big numbers, Instrument Sans for text.
import { loadFont as loadTitle } from '@remotion/google-fonts/PlusJakartaSans';
import { loadFont as loadText } from '@remotion/google-fonts/InstrumentSans';

const title = loadTitle('normal', { weights: ['600', '700', '800'], subsets: ['latin'] });
const text = loadText('normal', { weights: ['400', '500', '600', '700'], subsets: ['latin'] });
const textItalic = loadText('italic', { weights: ['400', '500', '600'], subsets: ['latin'] });

export const FONT = { title: title.fontFamily, sans: text.fontFamily, italic: textItalic.fontFamily };

export const C = {
  navy: '#1C5094', // brief header
  band: '#1A2835', // brief's dark band
  blue: '#3B85EE', // SAP blue: numbers, section pills, Joule
  blueSoft: 'rgba(59,133,238,0.14)',
  tint: '#F0F9FE', // light-blue callout boxes
  gray: '#F2F3F4', // cards and sidebar
  white: '#FFFFFF',
  card: 'rgba(255,255,255,0.88)', // see-through white over footage, always with GLASS behind it
  ink: '#1A2835',
  mute: '#646C73',
  line: '#DCE1E6',
  green: '#497E50', // "measuring success" bars
  red: '#D0342C',
  redSoft: 'rgba(208,52,44,0.12)',
};

/** frosted glass behind the see-through cards */
export const GLASS = 'blur(16px) saturate(140%)';
export const SHADOW = '0 18px 50px rgba(10,30,60,0.28), 0 4px 12px rgba(10,30,60,0.16)';
