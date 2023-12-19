// import { Injectable, NgZone } from '@angular/core';
// import { User } from '../models/user.model';
// import { Observable, Subject } from 'rxjs';
// import { Router } from '@angular/router';

// //
// // Firebase
// import { AngularFireAuth } from '@angular/fire/auth';
// import { environment } from 'src/environments/environment';

// // import  auth  from 'firebase/app';
// import firebase from 'firebase/app';

// // import { auth } from 'firebase/app';
// // import { AngularFirestore } from '@angular/fire/firestore';
// // import { AngularFireAuth } from 'angularfire2/auth';
// // import { AngularFirestoreDocument } from 'angularfire2/firestore';
// // import { auth } from 'firebase/app';
// // import { ProfileService } from './profile.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   routing = environment.routing;
//   userData: User;
//   userSubject = new Subject<User>();

//   constructor(
//     private afAuth: AngularFireAuth,
//     // private _fs: AngularFirestore,
//     private router: Router,
//     public _ngZone: NgZone
//   ) {
//     this.afAuth.authState.subscribe((user) => {
//       if (user) {
//         this.setUserData(user);
//         this.authStateChanged();
//       } else {
//         localStorage.removeItem('user');
//       }
//     });
//   }

//   signIn(email, password): Promise<any> {
//     return this.afAuth.signInWithEmailAndPassword(email, password);
//     // return this._fa.auth.signInWithEmailAndPassword(email, password);
//   }

//   // Register user with email/password
//   registerUser(email, password): any {
//     return this.afAuth.createUserWithEmailAndPassword(email, password);
//   }

//   // Email verification when new user register
//   // sendVerificationMail() {
//   //   return this._fa.currentUser.sendEmailVerification().then(() => {
//   //     // this.router.navigate(['verify-email']);
//   //   });
//   // }

//   // Recover password
//   passwordRecover(passwordResetEmail): any {
//     return this.afAuth
//       .sendPasswordResetEmail(passwordResetEmail)
//       .then(() => {
//         window.alert(
//           'Password reset email has been sent, please check your inbox.'
//         );
//       })
//       .catch((error) => {
//         window.alert(error);
//       });
//   }

//   authStateChanged(): void {
//     this.afAuth.onAuthStateChanged((user) => {
//       if (user) {
//         this.setUserData(user);
//       } else {
//         this.afAuth.signOut();
//       }
//     });
//   }

//   // Returns true when user is looged in
//   get isLoggedIn(): boolean {
//     const user = JSON.parse(localStorage.getItem('user')) || null;
//     if (user) {
//       this.setUserData(user);
//     }
//     // return user !== null && user.emailVerified !== false ? true : false;
//     return user !== null ? true : false;
//   }

//   // Returns true when user's email is verified
//   get isEmailVerified(): boolean {
//     const user = JSON.parse(localStorage.getItem('user')) || null;
//     return user.emailVerified !== false ? true : false;
//   }

//   checkUser(): void {
//     if (this.isLoggedIn) {
//       const user = JSON.parse(localStorage.getItem('user')) || null;
//       if (user) {
//         this.setUserData(user);
//       }
//     } else {
//       this.signOut();
//     }
//   }

//   // authLogin(provider): any {
//   //   return this.afAuth
//   //     .signInWithPopup(provider)
//   //     .then((result) => {
//   //       this._ngZone.run(() => {
//   //         // TODO: Need check this router
//   //         this.router.navigate(['invoice']);
//   //       });
//   //       this.setUserData(result.user);
//   //     })
//   //     .catch((error) => {
//   //       window.alert(error);
//   //     });
//   // }

//   // Store user in localStorage and subject
//   setUserData(user): void {
//     const userData: User = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       emailVerified: user.emailVerified,
//       token: user.idToken,
//       refreshToken: user.refreshToken
//     };

//     this.userSubject.next(userData);
//     this.userData = userData;
//     localStorage.setItem('user', JSON.stringify(userData));
//   }

//   signOut(): any {
//     // TODO: Need to check why this function called every time when user not Auth
//     return this.afAuth.signOut().then(() => {
//       localStorage.removeItem('user');
//       this.router.navigate([environment.routing.default.home]);
//     });
//   }

//   getUserStateChange(): Observable<User> {
//     return this.userSubject.asObservable();
//   }

//   getUserId(): string {
//     if (this.userData) {
//       return this.userData.uid;
//     } else {
//       this.checkUser();
//       if (this.userData) {
//         return this.userData.uid;
//       } else {
//         this.signOut();
//       }
//     }
//   }

//   getUser(): User {
//     if (this.userData) {
//       return this.userData;
//     } else {
//       this.checkUser();
//       if (this.userData) {
//         return this.userData;
//       } else {
//         return null;
//       }
//     }
//   }

//   getUserDisplayName(): string {
//     if (!this.userData) {
//       return null;
//     }
//     return this.userData.displayName || this.userData.email;
//   }

//   // async loginWithGoogle() {
//   //   await this._fa.signInWithPopup(new auth.GoogleAuthProvider());
//   //   this.router.navigate([environment.routing.home]);
//   // }

//   async logout() {
//     await this.afAuth.signOut();
//     localStorage.removeItem('user');
//     this.router.navigate([environment.routing.auth.login]);
//   }

//   loginWithGooglePopup(returnUrl = '/'): Promise<any> {
//     return this.afAuth
//       .signInWithPopup(new firebase.auth.GoogleAuthProvider())
//       .then((response) => {
//         if (response.user) {
//           this.setUserData(response.user);
//           returnUrl == '/'
//             ? this.router.navigate([this.routing.admin.dashboard])
//             : this.router.navigateByUrl(returnUrl);
//         }
//       });
//   }
// }
