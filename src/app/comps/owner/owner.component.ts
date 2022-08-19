import { Component, OnInit } from '@angular/core';
import { OperationsService } from "../operations.service";
import { OrderItem } from "../order-item.model";
import { Product } from "../product.model";

// TODO-7:
//   1. If you see Owner's HTML template, you realize it's the parent since
//      it summons Boutique and Buyer into action, hence, add
//      `OperationsService` to the `providers` list in @Component
@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  // TODO-8:
  //   Make Owner happy! He's only concerned with "earnings", so:
  //   1. ditch `products`; boutique component can get it's products from store
  //   2. ditch `order`; buyer component knows best how to get its order items
  //   3. yep, all owner needs to be concerned with is `earnings$` for growth n'all;
  //      using the selector you created in 6.2, make `earnings` here become
  //      `earnings$` and initialize it to that of the store's (and fix your template)
  //   4. Remember, every time you remove an @Input or an @Output from the
  //      children, clean up Owner's template accordingly

  products!: Product[];
  order!: OrderItem[];
  earnings: number = 0;

  constructor(private store: OperationsService) {
  }

  // TODO-9:
  //   1. Making Owner happy right? You know what to do about all the methods below
  ngOnInit(): void {
    this.products = this.store.products;
  }

  collectOrder(order: OrderItem[]) {
    this.order = order;
  }

  // take a quick look, but then ditch it
  receivePayment(newPayment: number) {
    this.earnings += newPayment;
    this.store.updateSales(this.order);
    const products = this.products;
    // to rebuild table, the following purge of DOM and rebuild is needed
    this.products = [];
    setTimeout(() => {
      this.products = products;
    });
  }
}
