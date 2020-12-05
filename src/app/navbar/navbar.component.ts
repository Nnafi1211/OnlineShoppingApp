import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app.user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;


  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });
  }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logOut();
  }

}
