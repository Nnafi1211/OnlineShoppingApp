import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line: no-input-rename
  @Input('show-actions') showActions = true;
  // tslint:disable-next-line: no-input-rename
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  addToCart() {
  this.cartService.addtoCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
