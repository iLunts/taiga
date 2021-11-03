import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

//
// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

// import { auth } from 'firebase/app';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { AngularFireAuth } from 'angularfire2/auth';
// import { AngularFirestoreDocument } from 'angularfire2/firestore';
// import { auth } from 'firebase/app';
// import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: User;
  userSubject = new Subject<User>();

  constructor(
    private _fa: AngularFireAuth,
    // private _fs: AngularFirestore,
    private _router: Router,
    public _ngZone: NgZone
  ) {
    this._fa.authState.subscribe((user) => {
      if (user) {
        this.setUserData(user);
        this.authStateChanged();
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  signIn(email, password): Promise<any> {
    return this._fa.signInWithEmailAndPassword(email, password);
    // return this._fa.auth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  registerUser(email, password): any {
    return this._fa.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  // sendVerificationMail() {
  //   return this._fa.currentUser.sendEmailVerification().then(() => {
  //     // this._router.navigate(['verify-email']);
  //   });
  // }

  // Recover password
  passwordRecover(passwordResetEmail): any {
    return this._fa
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  authStateChanged(): void {
    this._fa.onAuthStateChanged((user) => {
      if (user) {
        this.setUserData(user);
      } else {
        this._fa.signOut();
      }
    });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
      this.setUserData(user);
    }
    // return user !== null && user.emailVerified !== false ? true : false;
    return user !== null ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    return user.emailVerified !== false ? true : false;
  }

  checkUser(): void {
    if (this.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user')) || null;
      if (user) {
        this.setUserData(user);
      }
    } else {
      this.signOut();
    }
  }

  authLogin(provider): any {
    return this._fa
      .signInWithPopup(provider)
      .then((result) => {
        this._ngZone.run(() => {
          this._router.navigate(['invoice']);
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Store user in localStorage and subject
  setUserData(user): void {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      token: user.idToken,
      refreshToken: user.refreshToken
    };

    this.userSubject.next(userData);
    this.userData = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  }

  signOut(): any {
    return this._fa.signOut().then(() => {
      localStorage.removeItem('user');
      this._router.navigate([environment.routing.admin.login]);
    });
  }

  getUserStateChange(): Observable<User> {
    return this.userSubject.asObservable();
  }

  getUserId(): string {
    if (this.userData) {
      return this.userData.uid;
    } else {
      this.checkUser();
      if (this.userData) {
        return this.userData.uid;
      } else {
        this.signOut();
      }
    }
  }

  getUser(): User {
    if (this.userData) {
      return this.userData;
    } else {
      this.checkUser();
      if (this.userData) {
        return this.userData;
      } else {
        return null;
      }
    }
  }

  getUserDisplayName(): string {
    if (!this.userData) {
      return null;
    }
    return this.userData.displayName || this.userData.email;
  }

  // async loginWithGoogle() {
  //   await this._fa.signInWithPopup(new auth.GoogleAuthProvider());
  //   this._router.navigate([environment.routing.home]);
  // }

  async logout() {
    await this._fa.signOut();
    localStorage.removeItem('user');
    this._router.navigate([environment.routing.admin.login]);
  }
}
