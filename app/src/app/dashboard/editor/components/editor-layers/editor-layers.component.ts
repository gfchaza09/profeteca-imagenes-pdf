import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LayerItem } from '../../services/editor-canvas.service';

@Component({
  selector: 'app-editor-layers',
  templateUrl: './editor-layers.component.html',
  styles: [
    `
      .editor-layers {
        max-height: 180px;
        overflow: auto;
        border-top: 1px solid #e2e8f0;
        background: #fff;
      }
    `,
  ],
})
export class EditorLayersComponent {
  @Input() layers: LayerItem[] = [];
  @Output() selectLayer = new EventEmitter<string>();
}
