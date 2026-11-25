import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { BehaviorSubject, Subject } from 'rxjs';

import {
  CanvasFormat,
  CanvasFormatId,
  getFormatById,
} from '../models/canvas-format.model';
import {
  BackgroundFitMode,
  charSpacingFromEm,
  PROFETECA_FONTS,
  TextPresetId,
  TEXT_PRESETS,
} from '../models/editor.constants';

export interface LayerItem {
  id: string;
  label: string;
  type: string;
  locked: boolean;
}

export interface SelectedImageProps {
  borderRadius: number;
  maxBorderRadius: number;
}

export interface SelectedTextProps {
  text: string;
  fontSize: number;
  fontFamily: string;
  fill: string;
  fontWeight: string;
  fontStyle: '' | 'normal' | 'italic' | 'oblique';
  textAlign: string;
  lineHeight: number;
  width: number;
  letterSpacingEm: number;
}

const CUSTOM_PROPS = [
  'profetecaRole',
  'profetecaLabel',
  'profetecaLetterSpacingEm',
  'profetecaBorderRadius',
];

@Injectable({ providedIn: 'root' })
export class EditorCanvasService {
  private canvas: fabric.Canvas | null = null;
  private format: CanvasFormat = getFormatById('square');
  private history: string[] = [];
  private historyIndex = -1;
  private suspendHistory = false;

  readonly format$ = new BehaviorSubject<CanvasFormat>(this.format);
  readonly selection$ = new Subject<fabric.Object | null>();
  readonly layers$ = new BehaviorSubject<LayerItem[]>([]);
  readonly viewScale$ = new BehaviorSubject<number>(0.4);

  getCanvas(): fabric.Canvas | null {
    return this.canvas;
  }

  getFormat(): CanvasFormat {
    return this.format;
  }

  init(element: HTMLCanvasElement, viewport: HTMLElement): void {
    if (this.canvas) {
      this.canvas.dispose();
    }

    this.canvas = new fabric.Canvas(element, {
      width: this.format.width,
      height: this.format.height,
      preserveObjectStacking: true,
      selection: true,
    });

    this.canvas.backgroundColor = '#FFFFFF';
    this.bindCanvasEvents();
    this.applyBuiltInBackground();
    this.pushHistory();
    this.refreshLayers();
    this.updateViewScale(viewport);
  }

  updateViewScale(viewport: HTMLElement): void {
    if (!this.canvas) return;
    const padding = 48;
    const maxW = Math.max(viewport.clientWidth - padding, 200);
    const maxH = Math.max(viewport.clientHeight - padding, 200);
    const scale = Math.min(
      maxW / this.format.width,
      maxH / this.format.height,
      1
    );
    this.viewScale$.next(scale);
  }

  setFormat(id: CanvasFormatId): void {
    if (!this.canvas) return;
    const next = getFormatById(id);
    const prev = this.format;
    if (prev.id === next.id) return;

    const ratioW = next.width / prev.width;
    const ratioH = next.height / prev.height;

    this.canvas.getObjects().forEach((obj) => {
      obj.left = (obj.left ?? 0) * ratioW;
      obj.top = (obj.top ?? 0) * ratioH;
      obj.scaleX = (obj.scaleX ?? 1) * ratioW;
      obj.scaleY = (obj.scaleY ?? 1) * ratioH;
      obj.setCoords();
    });

    this.format = next;
    this.canvas.setWidth(next.width);
    this.canvas.setHeight(next.height);
    this.canvas.requestRenderAll();
    this.format$.next(next);
    this.pushHistory();
  }

  newDesign(): void {
    if (!this.canvas) return;
    this.canvas.clear();
    this.canvas.backgroundColor = '#FFFFFF';
    this.applyBuiltInBackground();
    this.history = [];
    this.historyIndex = -1;
    this.pushHistory();
    this.refreshLayers();
  }

  applyBuiltInBackground(): void {
    if (!this.canvas) return;
    this.removeBackgroundObjects();
    const rect = new fabric.Rect({
      left: 0,
      top: 0,
      width: this.format.width,
      height: this.format.height,
      fill: '#FAF8FF',
      selectable: false,
      evented: false,
      profetecaRole: 'background',
      profetecaLabel: 'Fondo Profeteca',
    } as fabric.IRectOptions);
    this.canvas.add(rect);
    this.canvas.sendToBack(rect);
    const accent = new fabric.Rect({
      left: 0,
      top: 0,
      width: this.format.width,
      height: 12,
      fill: '#2563EB',
      selectable: false,
      evented: false,
      profetecaRole: 'background',
      profetecaLabel: 'Acento',
    } as fabric.IRectOptions);
    this.canvas.add(accent);
    this.canvas.sendToBack(accent);
    this.canvas.requestRenderAll();
  }

  loadTemplateAsset(url: string, fit: BackgroundFitMode = 'cover'): void {
    fabric.Image.fromURL(
      url,
      (img) => {
        if (!this.canvas || !img) return;
        this.setBackgroundImage(img, fit);
      },
      { crossOrigin: 'anonymous' }
    );
  }

  loadBackgroundFromFile(file: File, fit: BackgroundFitMode): void {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      fabric.Image.fromURL(dataUrl, (img) => {
        if (!this.canvas || !img) return;
        this.setBackgroundImage(img, fit);
      });
    };
    reader.readAsDataURL(file);
  }

  private setBackgroundImage(img: fabric.Image, fit: BackgroundFitMode): void {
    if (!this.canvas) return;
    this.removeBackgroundObjects();

    const cw = this.format.width;
    const ch = this.format.height;
    const iw = img.width ?? cw;
    const ih = img.height ?? ch;

    let scaleX = cw / iw;
    let scaleY = ch / ih;

    if (fit === 'cover') {
      const scale = Math.max(scaleX, scaleY);
      scaleX = scale;
      scaleY = scale;
    } else if (fit === 'contain') {
      const scale = Math.min(scaleX, scaleY);
      scaleX = scale;
      scaleY = scale;
    }

    img.set({
      left: fit === 'stretch' ? 0 : (cw - iw * scaleX) / 2,
      top: fit === 'stretch' ? 0 : (ch - ih * scaleY) / 2,
      scaleX: fit === 'stretch' ? cw / iw : scaleX,
      scaleY: fit === 'stretch' ? ch / ih : scaleY,
      selectable: true,
      evented: true,
      profetecaRole: 'background',
      profetecaLabel: 'Imagen de fondo',
    } as fabric.IImageOptions);

    this.canvas.add(img);
    this.canvas.sendToBack(img);
    this.canvas.requestRenderAll();
    this.pushHistory();
    this.refreshLayers();
  }

  private removeBackgroundObjects(): void {
    if (!this.canvas) return;
    const toRemove = this.canvas
      .getObjects()
      .filter((o) => (o as fabric.Object & { profetecaRole?: string }).profetecaRole === 'background');
    toRemove.forEach((o) => this.canvas?.remove(o));
  }

  addImageFromFile(file: File): void {
    if (!this.canvas) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      fabric.Image.fromURL(dataUrl, (img) => {
        if (!this.canvas || !img) return;
        const maxW = this.format.width * 0.45;
        const scale = maxW / (img.width ?? maxW);
        img.set({
          left: this.format.width * 0.1,
          top: this.format.height * 0.2,
          scaleX: scale,
          scaleY: scale,
          lockUniScaling: true,
          profetecaRole: 'content',
          profetecaLabel: file.name,
          profetecaBorderRadius: 0,
        } as fabric.IImageOptions);
        this.applyImageBorderRadius(img, 0);
        this.canvas.add(img);
        this.canvas.setActiveObject(img);
        this.canvas.requestRenderAll();
        this.pushHistory();
        this.refreshLayers();
      });
    };
    reader.readAsDataURL(file);
  }

  addTextPreset(presetId: TextPresetId): void {
    const preset = TEXT_PRESETS.find((p) => p.id === presetId);
    if (!preset || !this.canvas) return;

    const text = new fabric.Textbox(preset.sample, {
      left: this.format.width * 0.08,
      top: this.format.height * 0.12,
      width: this.format.width * 0.84,
      fontSize: preset.fontSize,
      fontFamily: PROFETECA_FONTS[0],
      fill: preset.fill,
      fontWeight: preset.fontWeight,
      fontStyle: preset.fontStyle,
      lineHeight: preset.lineHeight,
      charSpacing: charSpacingFromEm(preset.letterSpacingEm),
      textAlign: 'left',
      profetecaRole: 'content',
      profetecaLabel: preset.label,
      profetecaLetterSpacingEm: preset.letterSpacingEm,
    } as fabric.ITextboxOptions);

    text.initDimensions();
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
    this.canvas.requestRenderAll();
    this.pushHistory();
    this.refreshLayers();
  }

  deleteSelected(): void {
    if (!this.canvas) return;
    const active = this.canvas.getActiveObjects();
    if (!active.length) return;
    active.forEach((obj) => this.canvas?.remove(obj));
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();
    this.pushHistory();
    this.refreshLayers();
  }

  duplicateSelected(): void {
    if (!this.canvas) return;
    const active = this.canvas.getActiveObject();
    if (!active) return;
    active.clone((cloned: fabric.Object) => {
      if (!this.canvas) return;
      cloned.set({
        left: (cloned.left ?? 0) + 24,
        top: (cloned.top ?? 0) + 24,
        profetecaRole: (active as fabric.Object & { profetecaRole?: string }).profetecaRole ?? 'content',
      });
      this.canvas.add(cloned);
      this.canvas.setActiveObject(cloned);
      this.canvas.requestRenderAll();
      this.pushHistory();
      this.refreshLayers();
    });
  }

  bringForward(): void {
    const obj = this.canvas?.getActiveObject();
    if (obj && this.canvas) {
      this.canvas.bringForward(obj);
      this.canvas.requestRenderAll();
      this.pushHistory();
      this.refreshLayers();
    }
  }

  sendBackward(): void {
    const obj = this.canvas?.getActiveObject();
    if (obj && this.canvas) {
      this.canvas.sendBackwards(obj);
      this.canvas.requestRenderAll();
      this.pushHistory();
      this.refreshLayers();
    }
  }

  selectLayer(id: string): void {
    if (!this.canvas) return;
    const obj = this.canvas.getObjects().find((o) => o.name === id);
    if (obj) {
      this.canvas.setActiveObject(obj);
      this.canvas.requestRenderAll();
    }
  }

  applyTextProps(props: Partial<SelectedTextProps>): void {
    const obj = this.canvas?.getActiveObject();
    if (!obj || obj.type !== 'textbox') return;
    const text = obj as fabric.Textbox;
    if (props.text !== undefined) text.text = props.text;
    if (props.fontSize !== undefined) {
      text.set('fontSize', props.fontSize);
      const meta = text as fabric.Textbox & {
        profetecaLetterSpacingEm?: number;
      };
      if (meta.profetecaLetterSpacingEm !== undefined) {
        text.set(
          'charSpacing',
          charSpacingFromEm(meta.profetecaLetterSpacingEm)
        );
      }
    }
    if (props.fontFamily !== undefined) text.set('fontFamily', props.fontFamily);
    if (props.fill !== undefined) text.set('fill', props.fill);
    if (props.fontWeight !== undefined) text.set('fontWeight', props.fontWeight);
    if (props.fontStyle !== undefined) {
      text.set(
        'fontStyle',
        props.fontStyle === '' ? 'normal' : props.fontStyle
      );
    }
    if (props.textAlign !== undefined) text.set('textAlign', props.textAlign);
    if (props.lineHeight !== undefined) text.set('lineHeight', props.lineHeight);
    if (props.width !== undefined) text.set('width', props.width);
    if (props.letterSpacingEm !== undefined) {
      const meta = text as fabric.Textbox & {
        profetecaLetterSpacingEm?: number;
      };
      meta.profetecaLetterSpacingEm = props.letterSpacingEm;
      text.set('charSpacing', charSpacingFromEm(props.letterSpacingEm));
    }
    text.initDimensions();
    this.canvas?.requestRenderAll();
    this.pushHistory();
  }

  applyImageProps(props: Partial<SelectedImageProps>): void {
    const obj = this.canvas?.getActiveObject();
    if (!obj || !this.isContentImage(obj)) return;
    const img = obj as fabric.Image;
    if (props.borderRadius !== undefined) {
      this.applyImageBorderRadius(img, props.borderRadius);
    }
    this.canvas?.requestRenderAll();
    this.pushHistory();
  }

  getSelectedImageProps(): SelectedImageProps | null {
    const obj = this.canvas?.getActiveObject();
    if (!obj || !this.isContentImage(obj)) return null;
    const img = obj as fabric.Image & { profetecaBorderRadius?: number };
    const w = img.width ?? 0;
    const h = img.height ?? 0;
    const maxBorderRadius = w && h ? Math.floor(Math.min(w, h) / 2) : 200;
    return {
      borderRadius: img.profetecaBorderRadius ?? 0,
      maxBorderRadius,
    };
  }

  getSelectedTextProps(): SelectedTextProps | null {
    const obj = this.canvas?.getActiveObject();
    if (!obj || obj.type !== 'textbox') return null;
    const text = obj as fabric.Textbox & {
      profetecaLetterSpacingEm?: number;
      charSpacing?: number;
    };
    const letterSpacingEm =
      text.profetecaLetterSpacingEm ??
      (text.charSpacing ?? 0) / 1000;
    return {
      text: text.text ?? '',
      fontSize: text.fontSize ?? 16,
      fontFamily: text.fontFamily ?? PROFETECA_FONTS[0],
      fill: (text.fill as string) ?? '#131B2E',
      fontWeight: String(text.fontWeight ?? '400'),
      fontStyle:
        text.fontStyle === 'italic' || text.fontStyle === 'oblique'
          ? text.fontStyle
          : '',
      textAlign: text.textAlign ?? 'left',
      lineHeight: text.lineHeight ?? 1.2,
      width: text.width ?? 200,
      letterSpacingEm,
    };
  }

  undo(): void {
    if (this.historyIndex <= 0 || !this.canvas) return;
    this.historyIndex -= 1;
    this.loadHistoryState(this.history[this.historyIndex]);
  }

  redo(): void {
    if (this.historyIndex >= this.history.length - 1 || !this.canvas) return;
    this.historyIndex += 1;
    this.loadHistoryState(this.history[this.historyIndex]);
  }

  canUndo(): boolean {
    return this.historyIndex > 0;
  }

  canRedo(): boolean {
    return this.historyIndex < this.history.length - 1;
  }

  exportPng(filename: string): void {
    if (!this.canvas) return;
    this.canvas.discardActiveObject();
    this.canvas.requestRenderAll();

    const dataUrl = this.canvas.toDataURL({
      format: 'png',
      multiplier: 1,
      enableRetinaScaling: false,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  }

  exportProjectJson(): string {
    if (!this.canvas) return '{}';
    return JSON.stringify({
      version: 1,
      formatId: this.format.id,
      canvas: this.canvas.toJSON(CUSTOM_PROPS),
    });
  }

  importProjectJson(json: string): void {
    if (!this.canvas) return;
    const parsed = JSON.parse(json) as {
      formatId?: CanvasFormatId;
      canvas?: Record<string, unknown>;
    };
    if (parsed.formatId) {
      this.setFormat(parsed.formatId);
    }
    if (parsed.canvas) {
      this.suspendHistory = true;
      this.canvas.loadFromJSON(parsed.canvas, () => {
        this.reapplyImageBorderRadii();
        this.canvas?.requestRenderAll();
        this.suspendHistory = false;
        this.pushHistory();
        this.refreshLayers();
      });
    }
  }

  private bindCanvasEvents(): void {
    if (!this.canvas) return;
    const push = () => this.pushHistory();
    this.canvas.on('selection:created', () => this.emitSelection());
    this.canvas.on('selection:updated', () => this.emitSelection());
    this.canvas.on('selection:cleared', () => this.selection$.next(null));
    this.canvas.on('object:modified', push);
    this.canvas.on('object:added', () => this.refreshLayers());
    this.canvas.on('object:removed', () => this.refreshLayers());
  }

  private emitSelection(): void {
    const obj = this.canvas?.getActiveObject() ?? null;
    this.selection$.next(obj);
  }

  private pushHistory(): void {
    if (!this.canvas || this.suspendHistory) return;
    const json = JSON.stringify(this.canvas.toJSON(CUSTOM_PROPS));
    if (this.historyIndex >= 0 && this.history[this.historyIndex] === json) {
      return;
    }
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(json);
    this.historyIndex = this.history.length - 1;
    if (this.history.length > 40) {
      this.history.shift();
      this.historyIndex -= 1;
    }
  }

  private loadHistoryState(state: string): void {
    if (!this.canvas) return;
    this.suspendHistory = true;
    this.canvas.loadFromJSON(JSON.parse(state), () => {
      this.reapplyImageBorderRadii();
      this.canvas?.requestRenderAll();
      this.suspendHistory = false;
      this.refreshLayers();
    });
  }

  private isContentImage(obj: fabric.Object): boolean {
    if (obj.type !== 'image') return false;
    const role = (obj as fabric.Object & { profetecaRole?: string })
      .profetecaRole;
    return role !== 'background';
  }

  private applyImageBorderRadius(
    img: fabric.Image,
    radiusPx: number
  ): void {
    const w = img.width ?? 0;
    const h = img.height ?? 0;
    const meta = img as fabric.Image & { profetecaBorderRadius?: number };

    if (radiusPx <= 0 || !w || !h) {
      img.set('clipPath', undefined);
      meta.profetecaBorderRadius = 0;
      img.dirty = true;
      return;
    }

    const r = Math.min(radiusPx, w / 2, h / 2);
    const clip = new fabric.Rect({
      width: w,
      height: h,
      rx: r,
      ry: r,
      originX: 'center',
      originY: 'center',
      left: 0,
      top: 0,
      absolutePositioned: false,
    });
    img.set('clipPath', clip);
    meta.profetecaBorderRadius = r;
    img.dirty = true;
  }

  private reapplyImageBorderRadii(): void {
    if (!this.canvas) return;
    this.canvas.getObjects().forEach((obj) => {
      if (!this.isContentImage(obj)) return;
      const img = obj as fabric.Image & { profetecaBorderRadius?: number };
      const radius = img.profetecaBorderRadius ?? 0;
      if (radius > 0) {
        this.applyImageBorderRadius(img, radius);
      }
    });
  }

  private refreshLayers(): void {
    if (!this.canvas) return;
    const items: LayerItem[] = this.canvas
      .getObjects()
      .slice()
      .reverse()
      .map((obj, index) => {
        if (!obj.name) {
          obj.name = `layer-${index}-${Date.now()}`;
        }
        const meta = obj as fabric.Object & {
          profetecaLabel?: string;
          profetecaRole?: string;
        };
        return {
          id: obj.name ?? String(index),
          label: meta.profetecaLabel ?? obj.type ?? 'Elemento',
          type: obj.type ?? 'object',
          locked: meta.profetecaRole === 'background' && !obj.selectable,
        };
      });
    this.layers$.next(items);
  }
}
