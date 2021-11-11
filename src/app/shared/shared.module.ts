import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaigaModule } from './taiga.module';
import { QRCodeModule } from 'angularx-qrcode';

// Angular Firebase lib
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment';
import { ComponentsModule } from './components/components.module';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { TextMaskModule } from 'angular2-text-mask';
import { TopMenuModule } from './components/top-menu/top-menu.module';
import { DisabledStateDirective } from './directives/disabled-state.directive';

@NgModule({
  declarations: [DisabledStateDirective],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
    TaigaModule,
    TextMaskModule,
    TopMenuModule
  ],
  exports: [
    CommonModule,
    ComponentsModule,
    DisabledStateDirective,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
    TaigaModule,
    TextMaskModule,
    TopMenuModule
  ]
})
export class SharedModule {}
