import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TuiFieldErrorModule, TuiInputModule } from '@taiga-ui/kit';

import { ResponsiblePersonPanelComponent } from './responsible-person-panel/responsible-person-panel.component';

@NgModule({
  declarations: [ResponsiblePersonPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiFieldErrorModule
  ],
  exports: [ResponsiblePersonPanelComponent]
})
export class ResponsiblePersonModule {}
