// import { Injectable } from '@angular/core';
// // import {
// //   AngularFirestore,
// //   AngularFirestoreCollection
// // } from '@angular/fire/firestore';
// import { AuthService } from './auth.service';
// import { ServiceGroup } from '../models/service.model';
// import { from, Observable } from 'rxjs';
// import { NotificationService } from './notification.service';
// import { Router } from '@angular/router';
// import { collection, Firestore } from 'firebase/firestore';
// import { collectionData } from 'rxfire/firestore';

// @Injectable({
//   providedIn: 'root'
// })
// export class ServicesGroupService {
//   private dbPath = '/servicesGroup';
//   // servicesGroupRef: AngularFirestoreCollection<ServiceGroup> = null;
//   servicesGroupRef;
//   // dbRef: AngularFirestoreCollection<ServiceGroup> = null;

//   constructor(
//     // private _fs: AngularFirestore,
//     firestore: Firestore,
//     private authService: AuthService,
//     private notificationService: NotificationService,
//     private route: Router
//   ) {
//     if (this.authService.isLoggedIn) {
//       // this.servicesGroupRef = _fs.collection(this.dbPath, (q) =>
//       //   q.where('_userId', '==', this.authService.getUserId())
//       // );
//       this.servicesGroupRef = collection(firestore, this.dbPath);
//     }
//   }

//   getAll$(): Observable<ServiceGroup[]> {
//     // return from(this.servicesGroupRef.valueChanges());
//     return collectionData(this.servicesGroupRef);
//   }

//   // getByName$(name: string): AngularFirestoreCollection<Service> {
//   //   return this._fs.collection(this.dbPath, (q) =>
//   //     q
//   //       .where('_userId', '==', this.authService.getUserId())
//   //       .where('name', '>=', name)
//   //   );
//   // }

//   add$(serviceGroup: ServiceGroup): Observable<any> {
//     serviceGroup._userId = this.authService.getUserId();
//     // return from(
//     //   this._fs
//     //     .collection(this.dbPath)
//     //     .doc(serviceGroup._id)
//     //     .set(JSON.parse(JSON.stringify(serviceGroup)))
//     //     .then(() => {
//     //       this.notificationService.success('Группа товаров успешно создана');
//     //     })
//     // );

//     return null;
//   }

//   // delete(_id: string): Promise<void> {
//   //   if (!_id) {
//   //     return;
//   //   }
//   //   return this.servicesRef.doc(_id).delete();
//   // }

//   // update(_id: string, value: any): Promise<void> {
//   //   return this.servicesRef.doc(_id).update(value);
//   // }
// }
