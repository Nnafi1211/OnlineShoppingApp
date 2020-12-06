import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart {

  items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [key: string]: ShoppingCartItem }) {

      this.itemsMap = itemsMap || {};

      // tslint:disable-next-line: forin
      for (let productId in itemsMap) {
        let item = itemsMap[productId];

        this.items.push(new ShoppingCartItem({
          ...item, // ... => this operator iterates all the property of the object
          key: productId
        }));
      }
     }

    get totalItemsCount() {
      let count = 0;
      // tslint:disable-next-line: forin
      for (let productId in this.itemsMap) {
        count += this.itemsMap[productId].quantity;
      }
      return count;
    }

    get totalPrice() {
      let sum = 0;

      // tslint:disable-next-line: forin
      for (let productId in this.items) {
        sum += this.items[productId].totalPrice;
      }

      return sum;
    }

    getQuantity(product: Product) {
      let item = this.itemsMap[product.key];
      return item ? item.quantity : 0;
    }

}