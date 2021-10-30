import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private _fs: AngularFirestore, private _auth: AuthService) {}

  getAll$(type: string): Observable<Status[]> {
    return this._fs
      .collection('/statuses', (q) =>
        q.where('type', 'array-contains', type).orderBy('order')
      )
      .valueChanges() as Observable<Status[]>;
  }
}
