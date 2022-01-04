import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private dbPath = '/units';
  unitRef: AngularFirestoreCollection<Unit> = null;

  constructor(private _fs: AngularFirestore, private authService: AuthService) {
    if (this.authService.isLoggedIn) {
      this.unitRef = _fs.collection(this.dbPath);
    }
  }

  getAll$(): Observable<Unit[]> {
    return from(this.unitRef.valueChanges());
  }
}
