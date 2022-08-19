import { Component } from '@angular/core';
import { Product } from "../product.model";
import { OperationsService } from "../operations.service";

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent {
  dataSource = this.store.products$;
  displayedColumns: string[] = ['sold', 'name', 'cost', 'quantity'];

  constructor(private store: OperationsService) {
  }

  addOrderItem(quantity: number, product: Product) {
    this.store.addOrderItem(quantity, product);
  }
}
