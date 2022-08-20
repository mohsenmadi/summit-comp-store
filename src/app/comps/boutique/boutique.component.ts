import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { Product } from "../product.model";
import { createOrderItem, OrderItem } from "../order-item.model";

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit, OnChanges, OnInit {
  @Input() products!: Product[] | null;
  @Output() emitOrder = new EventEmitter<OrderItem[]>();
  orderMap = new Map<number, OrderItem>;

  dataSource: any;
  displayedColumns: string[] = ['sold', 'name', 'cost', 'quantity'];

  ngOnInit() {
    this.dataSource = this.products;
  }

  ngOnChanges() {
    this.orderMap.clear();
    this.dataSource = this.products;
  }

  addOrderItem(quantity: number, product: Product) {
    const newOrderItem = createOrderItem(quantity, product);
    this.orderMap.set(product.id, newOrderItem);
    this.emitOrder.emit([...this.orderMap.values()]);
  }
}
