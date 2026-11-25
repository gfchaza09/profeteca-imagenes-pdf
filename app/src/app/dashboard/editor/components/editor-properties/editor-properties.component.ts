import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  PROFETECA_FONTS,
  PROFETECA_IMAGE_RADIUS_PRESETS,
} from '../../models/editor.constants';
import {
  SelectedImageProps,
  SelectedTextProps,
} from '../../services/editor-canvas.service';

@Component({
  selector: 'app-editor-properties',
  templateUrl: './editor-properties.component.html',
  styles: [
    `
      .editor-properties {
        width: 280px;
        border-left: 1px solid #e2e8f0;
        background: #f8fafc;
      }
    `,
  ],
})
export class EditorPropertiesComponent {
  readonly fonts = PROFETECA_FONTS;
  readonly radiusPresets = PROFETECA_IMAGE_RADIUS_PRESETS;

  @Input() hasSelection = false;
  @Input() isText = false;
  @Input() isImage = false;
  @Input() textProps: SelectedTextProps | null = null;
  @Input() imageProps: SelectedImageProps | null = null;

  @Output() textChange = new EventEmitter<Partial<SelectedTextProps>>();
  @Output() imageChange = new EventEmitter<Partial<SelectedImageProps>>();
  @Output() duplicate = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() bringForward = new EventEmitter<void>();
  @Output() sendBackward = new EventEmitter<void>();

  patch(field: keyof SelectedTextProps, raw: string | number): void {
    this.textChange.emit({ [field]: raw } as Partial<SelectedTextProps>);
  }

  patchImage(field: keyof SelectedImageProps, raw: number): void {
    this.imageChange.emit({ [field]: raw } as Partial<SelectedImageProps>);
  }

  setRadiusPreset(px: number): void {
    this.imageChange.emit({ borderRadius: px });
  }

  toggleBold(): void {
    if (!this.textProps) return;
    const next = this.textProps.fontWeight === '700' ? '400' : '700';
    this.textChange.emit({ fontWeight: next });
  }

  toggleItalic(): void {
    if (!this.textProps) return;
    const next = this.textProps.fontStyle === 'italic' ? '' : 'italic';
    this.textChange.emit({ fontStyle: next });
  }
}
