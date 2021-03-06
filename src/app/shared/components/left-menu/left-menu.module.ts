import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './left-menu.component';
import { RouterModule } from '@angular/router';
import { TuiAvatarModule, TuiBadgedContentModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  declarations: [LeftMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    TuiAvatarModule,
    TuiBadgedContentModule,
    TuiButtonModule,
  ],
  exports: [LeftMenuComponent],
})
export class LeftMenuModule { }
