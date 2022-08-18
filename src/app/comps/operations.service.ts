import { Product, updateSoldProperty } from './product.model';
import { map, take, zip } from "rxjs";
import { createOrder, getOrdersWithQuantity, getPaymentDue, Order } from "./order.model";
import { ComponentStore } from "@ngrx/component-store";
import { Injectable } from "@angular/core";

export interface OperationsState {
  products: Product[];
  orders: Order[];
  earnings: number;
  paymentDue: number;
}

const defaultState: OperationsState = {
  products: [],
  orders: [],
  earnings: 0,
  paymentDue: 0
};

@Injectable()
export class OperationsService extends ComponentStore<OperationsState> {

  products: Product[] = [
    {id: 10, sold: 0, name: 'Beach ball', cost: 14},
    {id: 20, sold: 0, name: 'Towel', cost: 5},
    {id: 30, sold: 0, name: 'Frisbee', cost: 2},
    {id: 40, sold: 0, name: 'Sunscreen', cost: 4},
    {id: 50, sold: 0, name: 'Cooler', cost: 25},
    {id: 60, sold: 0, name: 'Swim suit', cost: 15}
  ];

  private ordersMap = new Map<number, Order>;

  constructor() {
    super(defaultState);
    this.loadProducts();
  }

  readonly loadProducts = () => this.setState((state) => ({
    ...state,
    products: this.products
  }));

  readonly products$ = this.select(({products}) => products);
  readonly paymentDue$ = this.select((state => state.paymentDue));
  readonly earnings$ = this.select(({earnings}) => earnings);
  readonly orders$ = this.select(({orders}) => orders);

  readonly productsUpdate = this.updater((state, products: Product[]) => ({
    ...state,
    products
  }));

  readonly addOrder = (quantity: number, product: Product) => {
    const newOrder = createOrder(quantity, product);
    this.ordersMap.set(product.id, newOrder);
    const orders = getOrdersWithQuantity([...this.ordersMap.values()]);
    this.patchState({orders});
    this.patchState({paymentDue: getPaymentDue(orders)});
  };

  readonly makePayment = () => {
    zip(this.earnings$, this.paymentDue$)
      .pipe(
        take(1),
        map(pair => pair[0] + pair[1])
      )
      .subscribe(earnings => {
        this.patchState({earnings});
        this.patchState({paymentDue: 0});
        this.patchState({orders: []});
        this.updateSales();
      });
  };

  readonly updateSales = () => {
    this.products$
      .pipe(take(1))
      .subscribe(products => {
        updateSoldProperty(products, [...this.ordersMap.values()]);
        this.ordersMap.clear();
        this.productsUpdate([]);
        this.productsUpdate(products);
      });
  };
}
