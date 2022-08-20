import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { getOrderItemsWithQuantity, getPaymentDue, OrderItem } from "../order-item.model";

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent implements OnChanges {
  @Input() order: OrderItem[] = [];
  @Output() emitPayment = new EventEmitter<number>();

  paymentDue = 0;
  dataSource: any;
  displayedColumns: string[] = ['name', 'cost', 'quantity', 'due'];

  ngOnChanges() {
    this.order = getOrderItemsWithQuantity(this.order);
    this.paymentDue = getPaymentDue(this.order);
    this.dataSource = this.order;
  }

  makePayment() {
    this.emitPayment.emit(this.paymentDue);
    this.paymentDue = 0;
    this.dataSource = [];
  }
}
