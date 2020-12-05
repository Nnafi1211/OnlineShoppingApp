import { Observable } from 'rxjs';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app.user';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService
    ) { }

  async ngOnInit(): Promise<void> {

    this.auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
    });

    this.cart$ =  await this.cartService.getCart();
  }

  logOut() {
    this.auth.logOut();
  }

}
