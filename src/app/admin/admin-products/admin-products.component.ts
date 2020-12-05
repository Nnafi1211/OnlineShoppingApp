import { Product } from './../../models/product';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
  columns: string[] = ['title', 'price', 'key'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService.getAll().snapshotChanges()
    .subscribe(products => {
      this.filteredProducts = this.products = products.map(
        product => {
          return {
            title: product.payload.val()['title'],
            category: product.payload.val()['category'],
            imageUrl: product.payload.val()['imageUrl'],
            price: product.payload.val()['price'],
            key: product.key
          } as Product;
        }
      );

      this.dataSource = new MatTableDataSource(this.filteredProducts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // If any of the products includes query then retunt it else return the hole product array.

  filter(query: string){
    this.dataSource.filter = query.trim().toLowerCase();
  }

}
