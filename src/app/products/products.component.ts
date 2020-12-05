import { ShoppingCartService } from './../services/shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  subscriptionP: Subscription;
  subscriptionC: Subscription;
  categoryName: string;
  cart: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    private productService: ProductService) {}

  async ngOnInit(): Promise<void> {
    this.subscriptionP = this.productService.getAll().snapshotChanges()
    .subscribe(products => {
      this.filteredProducts = this.products = products.map(
        product => {
          return {
            title: product.payload.val()['title'],
            price: product.payload.val()['price'],
            category: product.payload.val()['category'],
            imageUrl: product.payload.val()['imageUrl'],
            key: product.key
          } as Product;
        }
      );
    });

    this.route.queryParamMap.subscribe(params => {

      this.categoryName = params.get('category');

      this.filteredProducts = (this.categoryName) ?
        this.products.filter(p => p.category === this.categoryName) : this.products;

    });

    this.subscriptionC = (await this.cartService.getCart())
    .subscribe(cart => {
      this.cart = cart;
    });

  }

  ngOnDestroy(): void {
    this.subscriptionP.unsubscribe();
    this.subscriptionC.unsubscribe();
  }

}
