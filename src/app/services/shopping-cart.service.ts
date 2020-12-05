import { ShoppingCart } from './../models/shopping-cart';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();

    return this.db.object('/shopping-carts/' + cartId).snapshotChanges()
    .pipe(
      map((x: any) => {
        let items = x.payload.val().items;
        return new ShoppingCart(items);
      })
    );
  }

  private getItem(cartId: string, productKey: string) {
    return  this.db.object('/shopping-carts/' + cartId + '/items/' + productKey);

  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if (!cartId) {
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }

    return cartId;

  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val()) {
        item$.update({ quantity: item.payload.val().quantity + change });
      }
      else{
        item$.set({ product: product, quantity: 1 });
      }
    });
  }

  async addtoCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }
}
