import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiNotificationModule } from '@taiga-ui/core';

import { TopMenuComponent } from './top-menu.component';

@NgModule({
  declarations: [TopMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
    TuiNotificationModule,
    TuiAvatarModule
  ],
  exports: [TopMenuComponent]
})
export class TopMenuModule {}
