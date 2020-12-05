import { Injectable, QueryList } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CatagoryService {

  constructor(private db: AngularFireDatabase) { }

  getCatagories() {
    return this.db.list('/categories');
  }
}
