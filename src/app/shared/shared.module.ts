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
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireMessagingModule,
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TaigaModule,
    QRCodeModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  exports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    TaigaModule,
    QRCodeModule,
    FroalaEditorModule,
    FroalaViewModule,
  ],
})
export class SharedModule {}
