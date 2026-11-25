export type CanvasFormatId = 'square' | 'feed' | 'story';

export interface CanvasFormat {
  id: CanvasFormatId;
  label: string;
  width: number;
  height: number;
  exportSlug: string;
}

export const CANVAS_FORMATS: CanvasFormat[] = [
  {
    id: 'square',
    label: 'Cuadrado 1080×1080',
    width: 1080,
    height: 1080,
    exportSlug: 'cuadrado',
  },
  {
    id: 'feed',
    label: 'Feed vertical 1080×1350',
    width: 1080,
    height: 1350,
    exportSlug: 'feed',
  },
  {
    id: 'story',
    label: 'Historia 1080×1920',
    width: 1080,
    height: 1920,
    exportSlug: 'historia',
  },
];

export function getFormatById(id: CanvasFormatId): CanvasFormat {
  const found = CANVAS_FORMATS.find((f) => f.id === id);
  return found ?? CANVAS_FORMATS[0];
}
