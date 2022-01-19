import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AsyncPipe, registerLocaleData } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { HttpClientModule } from '@angular/common/http';
import { iconsPathFactory, TUI_ICONS_PATH } from '@taiga-ui/core';
import { LayoutsModule } from './layouts/layouts.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { TaigaModule } from './shared/taiga.module';
import localeRu from '@angular/common/locales/ru';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ContractorAsideLayoutComponent } from './layouts/contractor-aside-layout/contractor-aside-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CompanyGuard } from './guards/company.guard';
import { entityConfig } from './entity-metadata';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'https://invoices-244bd.firebaseio.com/',
  timeout: 3000 // request timeout
};

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
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    HttpClientModule,
    LayoutsModule,
    SharedModule,
    StoreModule.forRoot({}, {}),
    TaigaModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    AuthGuard,
    CompanyGuard,
    AsyncPipe,
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/')
    },
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig
    },
    { provide: LOCALE_ID, useValue: 'ru' }
    // MessagingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
