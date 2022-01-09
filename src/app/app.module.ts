import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { iconsPathFactory, TUI_ICONS_PATH } from '@taiga-ui/core';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe, registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
// import { DefaultDataServiceConfig } from '@ngrx/data';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/shared.module';
// import { StoreModule } from '@ngrx/store';
import { TaigaModule } from './shared/taiga.module';
import localeRu from '@angular/common/locales/ru';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ContractorAsideLayoutComponent } from './layouts/contractor-aside-layout/contractor-aside-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { CompanyGuard } from './guards/company.guard';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
// import { EffectsModule } from '@ngrx/effects';
// import { entityConfig } from './entity-metadata';
// import { EntityDataModule } from '@ngrx/data';
// import { environment } from '../environments/environment';
// import { MessagingService } from './services/messaging.service';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// const defaultDataServiceConfig: DefaultDataServiceConfig = {
//   root: 'crud'
// };

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
    HttpClientModule,
    LayoutsModule,
    SharedModule,
    // StoreModule.forRoot({}, {}),
    TaigaModule,
    EntityDataModule.forRoot(entityConfig),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25,
    //   logOnly: environment.production
    // }),
    // EffectsModule.forRoot([]),
    // EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    AuthGuard,
    CompanyGuard,
    AsyncPipe,
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/')
    },
    // {
    //   provide: DefaultDataServiceConfig,
    //   useValue: defaultDataServiceConfig
    // },
    { provide: LOCALE_ID, useValue: 'ru' }
    // MessagingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
