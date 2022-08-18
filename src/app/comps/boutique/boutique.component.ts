import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { Product } from "../product.model";
import { createOrder, Order } from "../order.model";

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit, OnChanges, OnInit {

  // TODO-10:
  //   With the right selectors, updaters/patchers, we can do without
  //   1. the `@Input`
  //   2. the `@Output`
  //   3. orderMap and it's logic will be moved to store
  @Input() products!: Product[] | null;
  @Output() emitOrders = new EventEmitter<Order[]>();
  ordersMap = new Map<number, Order>;

  // TODO-11:
  //   1. `dataSource` feeder now comes from the store, set it right
  dataSource: any;
  displayedColumns: string[] = ['sold', 'name', 'cost', 'quantity'];

  // TODO-12:
  //   1. because you're accessing products$ from the store and already made the "bind"
  //      between it and `dataSource`, you don't need `ngOnInit()`
  ngOnInit() {
    this.dataSource = this.products;
  }

  // TODO-13:
  //   1. yep, not needed too! `orderMap` logic is to be moved to store,
  //      and `dataSource` is already bound
  ngOnChanges() {
    this.ordersMap.clear();
    this.dataSource = this.products;
  }

  // TODO-14:
  //    1. all that's needed here is delegate the work to the store's `addOrder(...)`
  addOrder(quantity: string, product: Product) {
    const newOrder = createOrder(quantity, product);
    this.ordersMap.set(product.id, newOrder);
    this.emitOrders.emit([...this.ordersMap.values()]);
  }
}
