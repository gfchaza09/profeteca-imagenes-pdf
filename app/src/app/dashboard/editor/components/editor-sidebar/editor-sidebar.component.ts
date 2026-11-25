import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BackgroundFitMode, TEXT_PRESETS, TextPresetId } from '../../models/editor.constants';
import { TemplateManifestItem } from '../../models/template-manifest.model';

@Component({
  selector: 'app-editor-sidebar',
  templateUrl: './editor-sidebar.component.html',
  styles: [
    `
      .editor-sidebar {
        width: 260px;
        border-right: 1px solid #e2e8f0;
        background: #f8fafc;
      }
    `,
  ],
})
export class EditorSidebarComponent {
  readonly textPresets = TEXT_PRESETS;

  @Input() templates: TemplateManifestItem[] = [];
  @Input() backgroundFit: BackgroundFitMode = 'cover';

  @Output() addImage = new EventEmitter<File>();
  @Output() addText = new EventEmitter<TextPresetId>();
  @Output() applyTemplate = new EventEmitter<TemplateManifestItem>();
  @Output() backgroundFile = new EventEmitter<File>();
  @Output() backgroundFitChange = new EventEmitter<BackgroundFitMode>();
  @Output() applyBuiltInBackground = new EventEmitter<void>();

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.addImage.emit(file);
      input.value = '';
    }
  }

  onBackgroundSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.backgroundFile.emit(file);
      input.value = '';
    }
  }

  onFitChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as BackgroundFitMode;
    this.backgroundFitChange.emit(value);
  }
}
