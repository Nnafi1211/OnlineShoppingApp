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

  async addtoCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
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

  private async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.payload.val()) {

        let quantityVal= item.payload.val().quantity + change;

        if (quantityVal === 0) {
          return item$.remove();
        }

        item$.update({
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: quantityVal
        });
      }
      else{
        item$.set({
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
          });
      }
    });
  }

}
