import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Service } from '../models/service.model';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private dbPath = '/services';
  servicesRef: AngularFirestoreCollection<Service> = null;
  dbRef: AngularFirestoreCollection<Service> = null;

  constructor(
    private _fs: AngularFirestore,
    private authService: AuthService,
    private notificationService: NotificationService,
    private route: Router
  ) {
    if (this.authService.isLoggedIn) {
      this.servicesRef = _fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this.authService.getUserId())
      );
    }
  }

  getAll$(): Observable<Service[]> {
    return this.servicesRef.valueChanges();
  }

  getByName$(name: string): AngularFirestoreCollection<Service> {
    return this._fs.collection(this.dbPath, (q) =>
      q
        .where('_userId', '==', this.authService.getUserId())
        .where('name', '>=', name)
    );
  }

  getById$(id: string): Observable<Service> {
    return from(
      this._fs
        .collection(this.dbPath, (q) =>
          q
            .where('_userId', '==', this.authService.getUserId())
            .where('_id', '==', id)
        )
        .valueChanges()
    ).pipe(
      first(),
      map((service) => service[0])
    ) as Observable<Service>;
  }

  add$(service: Service): Observable<any> {
    service._userId = this.authService.getUserId();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(service._id)
        .set(JSON.parse(JSON.stringify(service)))
        .then(() => {
          this.notificationService.success('Товар успешно создан');
          this.route.navigate([
            environment.routing.admin.settings.services.list
          ]);
        })
    );
  }

  delete$(_id: string): Observable<any> {
    return from(
      this.servicesRef
        .doc(_id)
        .delete()
        .then(() => {
          this.notificationService.success('Товар успешно удалён');
        })
    );
  }

  update$(_id: string, data: Service): Observable<any> {
    return from(
      this.servicesRef
        .doc(_id)
        .update(data)
        .then(() => this.notificationService.info('Товар успешно обновлен'))
    );
  }
}
