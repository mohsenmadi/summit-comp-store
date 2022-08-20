import { Injectable } from '@angular/core';
import { Product, updateSoldProperty } from './product.model';
import { OrderItem } from "./order-item.model";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  products: Product[] = [
    {id: 10, sold: 0, name: 'Beach ball', cost: 14},
    {id: 20, sold: 0, name: 'Towel', cost: 5},
    {id: 30, sold: 0, name: 'Frisbee', cost: 2},
    {id: 40, sold: 0, name: 'Sunscreen', cost: 4},
    {id: 50, sold: 0, name: 'Cooler', cost: 25},
    {id: 60, sold: 0, name: 'Swim suit', cost: 15}
  ];

  updateSales(order: OrderItem[]) {
    updateSoldProperty(this.products, order);
  }
}
