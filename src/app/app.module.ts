import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AsyncPipe, CommonModule, registerLocaleData } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { tuiIconsPathFactory, TUI_ICONS_PATH } from '@taiga-ui/core';
import { LayoutsModule } from './layouts/layouts.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { TaigaModule } from './shared/taiga.module';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import localeRu from '@angular/common/locales/ru';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ContractorAsideLayoutComponent } from './layouts/contractor-aside-layout/contractor-aside-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CompanyGuard } from './guards/company.guard';
import { entityConfig } from './entity-metadata';
import { environment } from '../environments/environment';
import { of } from 'rxjs';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ContractorAsideLayoutComponent,
    DefaultLayoutComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    HttpClientModule,
    LayoutsModule,
    SharedModule,
    TaigaModule,
  ],
  providers: [
    AuthGuard,
    CompanyGuard,
    AsyncPipe,
    {
      provide: TUI_ICONS_PATH,
      useValue: tuiIconsPathFactory('assets/taiga-ui/icons/')
    },
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
