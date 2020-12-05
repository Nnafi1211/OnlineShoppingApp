import { Component, Input, OnInit } from '@angular/core';
import { CatagoryService } from '../services/catagory.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;

  // tslint:disable-next-line: no-input-rename
  @Input('categoryName') categoryName;

  constructor(private catagoryService: CatagoryService) { }

  ngOnInit(): void {
    this.categories$ = this.catagoryService.getCatagories().snapshotChanges();
  }

}
