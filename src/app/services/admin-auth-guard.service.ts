import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor( private auth: AuthService ) { }

  canActivate() {
    return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin)
    );
  }
}
