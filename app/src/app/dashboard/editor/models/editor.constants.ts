export const PROFETECA_FONTS = [
  'Plus Jakarta Sans',
  'Arial',
  'Georgia',
  'Times New Roman',
];

export const PROFETECA_COLORS = {
  primary: '#2563EB',
  onSurface: '#131B2E',
  onSurfaceVariant: '#434655',
  background: '#FAF8FF',
};

export type TextPresetId = 'title' | 'subtitle' | 'body' | 'accent';

/** Fabric charSpacing = letterSpacingEm × 1000 (equiv. CSS letter-spacing en em). */
export function charSpacingFromEm(letterSpacingEm: number): number {
  return Math.round(letterSpacingEm * 1000);
}

export interface TextPreset {
  id: TextPresetId;
  label: string;
  sample: string;
  fontSize: number;
  fontWeight: string;
  fill: string;
  lineHeight: number;
  fontStyle: '' | 'italic';
  letterSpacingEm: number;
}

export const TEXT_PRESETS: TextPreset[] = [
  {
    id: 'title',
    label: 'Título',
    sample: 'Título de la publicación',
    fontSize: 26,
    fontWeight: '700',
    fill: PROFETECA_COLORS.onSurface,
    lineHeight: 1.31,
    fontStyle: '',
    letterSpacingEm: -0.02,
  },
  {
    id: 'subtitle',
    label: 'Subtítulo',
    sample: 'Subtítulo descriptivo',
    fontSize: 18,
    fontWeight: '600',
    fill: PROFETECA_COLORS.onSurface,
    lineHeight: 1.44,
    fontStyle: '',
    letterSpacingEm: 0,
  },
  {
    id: 'body',
    label: 'Párrafo',
    sample: 'Texto del cuerpo de la publicación.',
    fontSize: 16,
    fontWeight: '400',
    fill: PROFETECA_COLORS.onSurfaceVariant,
    lineHeight: 1.5,
    fontStyle: '',
    letterSpacingEm: 0,
  },
  {
    id: 'accent',
    label: 'Acento marca',
    sample: 'Destacado Profeteca',
    fontSize: 22,
    fontWeight: '700',
    fill: PROFETECA_COLORS.primary,
    lineHeight: 1.3,
    fontStyle: '',
    letterSpacingEm: -0.02,
  },
];

export type BackgroundFitMode = 'cover' | 'contain' | 'stretch';

/** Atajos de radio (px); 20 ≈ AppRadius.card en profeteca_app. */
export const PROFETECA_IMAGE_RADIUS_PRESETS = [16, 20, 24] as const;
