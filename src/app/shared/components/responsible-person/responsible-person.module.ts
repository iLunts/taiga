import { TuiErrorModule } from "@taiga-ui/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TuiInputModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';

import { ResponsiblePersonPanelComponent } from './responsible-person-panel/responsible-person-panel.component';

@NgModule({
  declarations: [ResponsiblePersonPanelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiFieldErrorPipeModule,
      TuiErrorModule
],
  exports: [ResponsiblePersonPanelComponent]
})
export class ResponsiblePersonModule {}
