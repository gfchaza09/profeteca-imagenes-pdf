import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CANVAS_FORMATS, CanvasFormatId } from '../../models/canvas-format.model';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styles: [
    `
      .editor-toolbar {
        border-bottom: 1px solid #e2e8f0;
        background: #fff;
      }
    `,
  ],
})
export class EditorToolbarComponent {
  readonly formats = CANVAS_FORMATS;

  @Input() formatId: CanvasFormatId = 'square';
  @Input() canUndo = false;
  @Input() canRedo = false;

  @Output() formatChange = new EventEmitter<CanvasFormatId>();
  @Output() newDesign = new EventEmitter<void>();
  @Output() undo = new EventEmitter<void>();
  @Output() redo = new EventEmitter<void>();
  @Output() exportPng = new EventEmitter<void>();
  @Output() exportJson = new EventEmitter<void>();
  @Output() importJson = new EventEmitter<void>();

  onFormatChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as CanvasFormatId;
    this.formatChange.emit(value);
  }
}
