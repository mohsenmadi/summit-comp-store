import { Component } from '@angular/core';
import { OperationsService } from "../operations.service";

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss']
})
export class BuyerComponent {

  paymentDue$ = this.store.paymentDue$;

  dataSource = this.store.orders$;
  displayedColumns: string[] = ['name', 'cost', 'quantity', 'due'];

  constructor(private store: OperationsService) {
  }

  makePayment() {
    this.store.makePayment();
  }
}
