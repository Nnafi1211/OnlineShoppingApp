import { ShoppingCartService } from './shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
    ) { }

  storeOrder(order) {
    return this.db.list('/orders').push(order);
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUserID(userId: string) {
    return this.db
        .list("/orders", ref => ref.orderByChild("userId").equalTo(userId))
        .valueChanges();
}

}
