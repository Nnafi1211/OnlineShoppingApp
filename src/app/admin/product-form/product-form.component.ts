import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Observable, Subscription } from 'rxjs';
import { CatagoryService } from '../../services/catagory.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  categories$: Observable<any[]>;
  id;
  subscribtion: Subscription;
  product = { 
    title: "",
    price: null,
    category: "",
    imageUrl: ""
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catagoryService: CatagoryService,
    private productService: ProductService
    ) {
    this.categories$ = catagoryService.getCatagories().snapshotChanges();

    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      this.subscribtion = productService.getProduct(this.id).snapshotChanges().pipe(take(1))
      .subscribe(p => {
        this.product = {
          title: p.payload.val()['title'],
          category: p.payload.val()['category'],
          imageUrl: p.payload.val()['imageUrl'],
          price: p.payload.val()['price'],
        } as Product;
      });
    }
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  save(product) {
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    }
    else{
      this.productService.createProduct(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Delete this product?')) {
      this.productService.deleteProduct(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

}
