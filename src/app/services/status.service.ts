// // import { AngularFirestore } from '@angular/fire/firestore';
// import { AuthService } from './auth.service';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Status } from '../models/status.model';
// import { Firestore } from '@angular/fire/firestore';
// import { collection } from 'firebase/firestore';
// import { collectionData } from 'rxfire/firestore';

// @Injectable({
//   providedIn: 'root'
// })
// export class StatusService {
//   private dbPath = '/statuses';
//   statusRef;

//   constructor(
//     // private _fs: AngularFirestore,
//     private _auth: AuthService,
//     firestore: Firestore
//   ) {
//     this.statusRef = collection(firestore, this.dbPath);
//   }

//   getAll$(type: string): Observable<Status[]> {
//     // return this._fs
//     //   .collection('/statuses', (q) =>
//     //     q.where('type', 'array-contains', type).orderBy('order')
//     //   )
//     //   .valueChanges() as Observable<Status[]>;
//     return collectionData(this.statusRef);
//   }
// }
