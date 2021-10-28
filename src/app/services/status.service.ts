import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private _fs: AngularFirestore, private _auth: AuthService) {}

  getAll$(path: string): Observable<Status[]> {
    return this._fs.collection(path).valueChanges() as Observable<Status[]>;
  }
}
