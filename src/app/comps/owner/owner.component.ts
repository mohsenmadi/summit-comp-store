import { Component, OnInit } from '@angular/core';
import { OperationsService } from "../operations.service";
import { Order } from "../order.model";
import { Product } from "../product.model";

// TODO-7:
//   1. If you see Owner's HTML template, you realize it's the parent since
//      it summons Boutique and Buyer into action, hence, add
//      `OperationsService` to the providers' list in @Component
@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  // TODO-8:
  //   Make Owner happy! he's only concerned with "earnings", so:
  //   1. ditch `products`; boutique component can get it's products from store
  //   2. ditch `orders`; buyer component knows best how to get its data
  //   3. yep, all owner needs to be concerned with is `earnings$` for growth n'all;
  //      using the selector you created in 6.2, so make `earnings` here become
  //      `earnings$` and initialize it to that of the store's (... one thing left!)

  products!: Product[];
  orders!: Order[];
  earnings: number = 0

  constructor(private store: OperationsService) { }

  // TODO-9:
  //   1. Making Owner happy right? You know what to do about all the below lines...
  ngOnInit(): void {
    this.products = this.store.products;
  }

  collectOrder(orders: Order[]) {
    this.orders = orders;
  }

  // logic here will be partially ported to service...
  receivePayment(newPayment: number) {
    this.earnings += newPayment;
    this.store.updateSales(this.orders);
    const products = this.products;
    this.products = [];
    setTimeout(() => {
      this.products = products;
    })
  }
}
