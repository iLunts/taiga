import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { iconsPathFactory, TUI_ICONS_PATH } from '@taiga-ui/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaigaModule } from './shared/taiga.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    TaigaModule,
  ],
  providers: [
      {
          provide: TUI_ICONS_PATH,
          useValue: iconsPathFactory('assets/taiga-ui/icons/'),
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
