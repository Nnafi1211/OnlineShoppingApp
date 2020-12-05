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
  subscription: Subscription;
  categoryName: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService.getAll().snapshotChanges()
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
