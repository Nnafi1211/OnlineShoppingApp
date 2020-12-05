import { ShoppingCartService } from '../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line: no-input-rename
  @Input('show-actions') showActions = true;
  // tslint:disable-next-line: no-input-rename
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
  this.cartService.addtoCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {

    if (!this.shoppingCart) {
      return 0;
    }

    let item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
