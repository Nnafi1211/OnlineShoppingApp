import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { AppUser } from '../models/app.user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.default.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.user$ =  afAuth.authState;
   }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  logOut() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user){
          return this.userService.get(user.uid).valueChanges();
        }
        return of(null);
      })
    );
  }
}
