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
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: 'crud',
};

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, DefaultLayoutComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    TaigaModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    AuthGuard,
    // MessagingService,
    AsyncPipe,
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/'),
    },
    {
      provide: DefaultDataServiceConfig,
      useValue: defaultDataServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
