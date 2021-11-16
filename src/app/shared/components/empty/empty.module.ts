import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';

import { EmptyPanelComponent } from './empty-panel/empty-panel.component';

@NgModule({
  declarations: [EmptyPanelComponent],
  imports: [CommonModule, TuiButtonModule],
  exports: [EmptyPanelComponent]
})
export class EmptyModule {}
