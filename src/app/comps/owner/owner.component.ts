import { Component, OnInit } from '@angular/core';
import { OperationsService } from "../operations.service";
import { OrderItem } from "../order-item.model";
import { Product } from "../product.model";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  products!: Product[];
  order!: OrderItem[];
  earnings: number = 0;

  constructor(private store: OperationsService) {
  }

  ngOnInit(): void {
    this.products = this.store.products;
  }

  collectOrder(order: OrderItem[]) {
    this.order = order;
  }

  receivePayment(newPayment: number) {
    this.earnings += newPayment;
    this.store.updateSales(this.order);
    const products = this.products;
    this.products = [];
    setTimeout(() => {
      this.products = products;
    });
  }
}
