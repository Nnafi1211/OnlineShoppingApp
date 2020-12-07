import { Order } from './../models/order';
import { AppUser } from './../models/app.user';
import { switchMap, map } from 'rxjs/operators';
import { OrderService } from './../services/order.service';
import { AuthService } from './../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.subscription = this.authService.user$
        .pipe(
            switchMap(user => this.orderService.getOrdersByUserID(user.uid))
        )
        .subscribe((orders: Array<Order>) => {
            this.orders = orders;
        });
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
