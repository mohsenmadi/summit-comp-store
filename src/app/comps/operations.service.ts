import { Injectable } from '@angular/core';
import { Product, updateSoldProperty } from './product.model';
import { Order } from "./order.model";

// TODO-1:
//   1. [done] `npm i @ngrx/component-store`
//   2. * Think: the state of what properties do we need to maintain?
//      Then, create an interface `OperationsState` that houses them
//      When done, cross-check with Accelerator#1.2 below
//   3. * What would the default (initial) value be for each object?
//      Then, create an object `defaultState` of type `OperationsState`
//      that sets them
//   4. Although an Injectable, we don't need the store at the `root`
//      level; its' needed only in the `providers` list at the component
//      that needs it; it's children will have access to it naturally;
//      make it @Injectable()
@Injectable({
  providedIn: 'root'
})
// TODO-2:
//   1. * To convert this service into a component-store, it has to "extend"
//      `ComponentStore` with the generic type you created above;
//       that's how the store becomes aware-of and manages it's properties state
export class OperationsService {

  products: Product[] = [
    {id: 10, sold: 0, name: 'Beach ball', cost: 14},
    {id: 20, sold: 0, name: 'Towel', cost: 5},
    {id: 30, sold: 0, name: 'Frisbee', cost: 2},
    {id: 40, sold: 0, name: 'Sunscreen', cost: 4},
    {id: 50, sold: 0, name: 'Cooler', cost: 25},
    {id: 60, sold: 0, name: 'Swim suit', cost: 15}
  ];

  private ordersMap = new Map<number, Order>;

  // TODO-3:
  //   1. Extending a parent? then `super(...)` initialize it
  //      with your default object

  // TODO-5:
  //   1. Let's `loadProducts()` in the constructor so that `products` is
  //      loaded and ready in the components that need it
  constructor() {
  }

  // TODO-4:
  //   1. * Our most important property is `products`. Only after its set
  //      can we view the Boutique and make `orders`, calculate `paymentDue`
  //      and keep our total `earnings` in check after every payment.
  //      So, let's create a `setState` method that immutably returns the state,
  //      but overrides the default setting with our list of fresh `products`

  // TODO-6:
  //   1. * `products` is state-managed, so if we create a selector for it,
  //      it's instantly available for any subscriber (here or in components).
  //      Create the selector for it. Should be the same name + $.
  //   2. While we're at it, create a selector for `earnings$` too.
  //   3. You need to more... go for them

  // TODO-18:
  //   At this time, you have have an error-free running app since all selectors
  //   are nicely available. What's needed now is to sync data up upon events
  //   received from the components. Let's handle what happens when an `addOrder()`
  //   is triggered:
  //   1. create a readonly `addOrder` method that receives a `quantity` and
  //      the `product` ordered
  //   2. get a `newOrder` by calling the `createOrder` method
  //   3. using `product.id` as key, "set" your `newOrder` in the `ordersMap`
  //   4. * tune the `orders` with the `getOrdersWithQuantity` method; this refinement
  //      is needed when the Buyer selects a quantity and then zeros it out;
  //      we don't need to see orders with 0 quantity in the Buyer's table
  //   That's it! We now have `orders` sync'ed up, which means we also know can know
  //   the `paymentDue` should the Buyer decides to `makePayment()`, so:
  //   5. patch the state of `orders`, and
  //   6. * patch the state of `paymentDue` using the help of `getPaymentDue(...) method
  //   Now, suddenly, you should see both the Buyer's table and the running total get
  //   updated with every new order made (i.e., blurred)!
  //   Why? Because they're sync'ed through `orders$` and `paymentDue$`

  // uncomment and finish this: readonly addOrder = ...

  updateSales(orders: Order[]) {
    updateSoldProperty(this.products, orders);
  }

  // TODO: create a `makePayment()` method that does this:
  //   1. use rxjs's zip() on `earnings$` and `this.paymentDue$`
  //   2. patchState of `earnings` by adding zip's observables
  //   we can now:
  //   3. patchState of `paymentDue` to zero now
  //   4. patchState of `orders` to []
  //   5. call the `updateSales()` method

  // TODO: create an `updateSales() method that does this:
  //   1. subscribe to `products$` to fetch `products`
  //   2. use `updateSoldProperty()` to update data
  //      parameters? (products, [...this.ordersMap.values()])
  //   3. we're done with `orderMap`, clear it
  //   4. update `productsUpdate` method update the state of `products`
  //   5. inform subscribers of `emitPaymentProcessed` that we're done
}


// ====================== Accelerators ===================================

// 1.2 `OperationsState` should manage
//     `products: Product[]`, `orders: Order[]`,
//     `earnings: number` and `paymentDue:number`

// 1.3 const defaultState: OperationsState = { products: [], orders: [],
//     earnings: 0, paymentDue: 0}

// 2.1 export class OperationsService extends ComponentStore<OperationsState> {

// 4.1   readonly loadProducts = () => this.setState((state) => ({
//         ...state,
//         products: this.products
//       }));

// 6.1   readonly products$ = this.select(({products}) => products);    or equally:
//       readonly products$ = this.select(state => state.products);

// 18.4  const orders = getOrdersWithQuantity([...this.ordersMap.values()]);

// 18.6  this.patchState({paymentDue: getPaymentDue(orders)}); (shortest style)
//       see https://ngrx.io/guide/component-store/write for other styles

