import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { CanvasFormatId } from '../../editor/models/canvas-format.model';
import {
  BackgroundFitMode,
  TextPresetId,
} from '../../editor/models/editor.constants';
import {
  TemplateManifest,
  TemplateManifestItem,
} from '../../editor/models/template-manifest.model';
import {
  EditorCanvasService,
  LayerItem,
  SelectedImageProps,
  SelectedTextProps,
} from '../../editor/services/editor-canvas.service';

@Component({
  templateUrl: './editor-page.component.html',
  styleUrls: ['./editor-page.component.css'],
})
export class EditorPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private editor = inject(EditorCanvasService);
  private titleService = inject(Title);
  private http = inject(HttpClient);

  @ViewChild('fabricCanvas') fabricCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('viewport') viewportRef!: ElementRef<HTMLDivElement>;

  formatId: CanvasFormatId = 'square';
  canvasWidth = 1080;
  canvasHeight = 1080;
  viewScale = 0.4;
  templates: TemplateManifestItem[] = [];
  backgroundFit: BackgroundFitMode = 'cover';

  layers: LayerItem[] = [];
  hasSelection = false;
  isText = false;
  isImage = false;
  textProps: SelectedTextProps | null = null;
  imageProps: SelectedImageProps | null = null;

  canUndo = false;
  canRedo = false;

  private subs = new Subscription();

  ngOnInit(): void {
    this.titleService.setTitle('Editor — Profeteca Imágenes');
    this.http
      .get<TemplateManifest>('assets/templates/manifest.json')
      .subscribe({
        next: (manifest) => {
          this.templates = manifest.templates ?? [];
        },
        error: () => {
          this.templates = [];
        },
      });
  }

  ngAfterViewInit(): void {
    this.editor.init(
      this.fabricCanvasRef.nativeElement,
      this.viewportRef.nativeElement
    );
    this.formatId = this.editor.getFormat().id;

    this.subs.add(
      this.editor.viewScale$.subscribe((s) => (this.viewScale = s))
    );
    this.subs.add(
      this.editor.format$.subscribe((f) => {
        this.formatId = f.id;
        this.canvasWidth = f.width;
        this.canvasHeight = f.height;
      })
    );
    this.subs.add(
      this.editor.layers$.subscribe((layers) => (this.layers = layers))
    );
    this.subs.add(
      this.editor.selection$.subscribe((obj) => {
        this.hasSelection = !!obj;
        this.isText = obj?.type === 'textbox';
        this.isImage =
          obj?.type === 'image' &&
          (obj as { profetecaRole?: string }).profetecaRole !== 'background';
        this.textProps = this.editor.getSelectedTextProps();
        this.imageProps = this.editor.getSelectedImageProps();
        this.refreshHistoryFlags();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.viewportRef?.nativeElement) {
      this.editor.updateViewScale(this.viewportRef.nativeElement);
    }
  }

  onFormatChange(id: CanvasFormatId): void {
    this.editor.setFormat(id);
    this.onResize();
  }

  onNewDesign(): void {
    if (confirm('¿Crear un diseño nuevo? Se perderá el trabajo actual en el lienzo.')) {
      this.editor.newDesign();
      this.refreshHistoryFlags();
    }
  }

  onUndo(): void {
    this.editor.undo();
    this.refreshHistoryFlags();
  }

  onRedo(): void {
    this.editor.redo();
    this.refreshHistoryFlags();
  }

  onExportPng(): void {
    const slug = this.editor.getFormat().exportSlug;
    this.editor.exportPng(`profeteca-${slug}.png`);
  }

  onExportJson(): void {
    const blob = new Blob([this.editor.exportProjectJson()], {
      type: 'application/json',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'profeteca-diseno.json';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  onImportJson(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          this.editor.importProjectJson(String(reader.result));
          this.refreshHistoryFlags();
          this.onResize();
        } catch {
          alert('No se pudo importar el archivo JSON.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  onAddImage(file: File): void {
    this.editor.addImageFromFile(file);
    this.refreshHistoryFlags();
  }

  onAddText(preset: TextPresetId): void {
    this.editor.addTextPreset(preset);
    this.refreshHistoryFlags();
  }

  onApplyTemplate(item: TemplateManifestItem): void {
    this.editor.loadTemplateAsset(`assets/templates/${item.file}`, this.backgroundFit);
  }

  onBuiltInBackground(): void {
    this.editor.applyBuiltInBackground();
    this.refreshHistoryFlags();
  }

  onBackgroundFile(file: File): void {
    this.editor.loadBackgroundFromFile(file, this.backgroundFit);
    this.refreshHistoryFlags();
  }

  onBackgroundFitChange(fit: BackgroundFitMode): void {
    this.backgroundFit = fit;
  }

  onTextChange(patch: Partial<SelectedTextProps>): void {
    this.editor.applyTextProps(patch);
    this.textProps = this.editor.getSelectedTextProps();
    this.refreshHistoryFlags();
  }

  onImageChange(patch: Partial<SelectedImageProps>): void {
    this.editor.applyImageProps(patch);
    this.imageProps = this.editor.getSelectedImageProps();
    this.refreshHistoryFlags();
  }

  onSelectLayer(id: string): void {
    this.editor.selectLayer(id);
  }

  refreshHistoryFlags(): void {
    this.canUndo = this.editor.canUndo();
    this.canRedo = this.editor.canRedo();
  }

  onDuplicate(): void {
    this.editor.duplicateSelected();
    this.refreshHistoryFlags();
  }

  onDelete(): void {
    this.editor.deleteSelected();
    this.refreshHistoryFlags();
  }

  onBringForward(): void {
    this.editor.bringForward();
    this.refreshHistoryFlags();
  }

  onSendBackward(): void {
    this.editor.sendBackward();
    this.refreshHistoryFlags();
  }
}
