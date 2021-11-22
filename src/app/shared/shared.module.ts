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

import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { ComponentsModule } from './components/components.module';
import { environment } from 'src/environments/environment';
import { StateInProgressDirective } from './directives/state-in-progress.directive';
import { TextMaskModule } from 'angular2-text-mask';
import { TopMenuModule } from './components/top-menu/top-menu.module';
import { EmptyModule } from './components/empty/empty.module';

@NgModule({
  declarations: [StateInProgressDirective],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    CommonModule,
    ComponentsModule,
    EmptyModule,
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
    EmptyModule,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
    StateInProgressDirective,
    TaigaModule,
    TextMaskModule,
    TopMenuModule
  ]
})
export class SharedModule {}
