import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { iconsPathFactory, TUI_ICONS_PATH } from '@taiga-ui/core';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { TaigaModule } from './shared/taiga.module';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ContractorAsideLayoutComponent } from './layouts/contractor-aside-layout/contractor-aside-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
// import { EffectsModule } from '@ngrx/effects';
// import { entityConfig } from './entity-metadata';
// import { EntityDataModule } from '@ngrx/data';
// import { environment } from '../environments/environment';
// import { MessagingService } from './services/messaging.service';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'crud'
};

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
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
    StoreModule.forRoot({}, {}),
    TaigaModule
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25,
    //   logOnly: environment.production
    // }),
    // EffectsModule.forRoot([]),
    // EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    AuthGuard,
    AsyncPipe,
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/')
    },
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig
    }
    // MessagingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
