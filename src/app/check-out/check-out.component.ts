import { Router } from '@angular/router';
import { Order } from '../models/order';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Shipping } from '../models/shipping';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping: Shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };

  cart: ShoppingCart;
  userId;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private router: Router
    ) { }

  async ngOnInit(): Promise<void> {
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => {
      this.cart = cart;
    });

    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {

    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.cartService.clearCart();

    this.router.navigate(['/order-success',  result.key]);

  }

}
