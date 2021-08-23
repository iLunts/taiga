import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { iconsPathFactory, TUI_ICONS_PATH } from '@taiga-ui/core';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
// import { MessagingService } from './services/messaging.service';
import { SharedModule } from './shared/shared.module';
import { TaigaModule } from './shared/taiga.module';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, DefaultLayoutComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    TaigaModule,
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    // MessagingService,
    AsyncPipe,
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/'),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
