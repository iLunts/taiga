import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyPanelComponent } from './empty-panel/empty-panel.component';

@NgModule({
  declarations: [EmptyPanelComponent],
  imports: [CommonModule],
  exports: [EmptyPanelComponent]
})
export class EmptyModule {}
