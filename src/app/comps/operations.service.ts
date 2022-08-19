import { Injectable } from '@angular/core';
import { Product, updateSoldProperty } from './product.model';
import { OrderItem } from "./order-item.model";

// TODO-1:
//   1. [done] `npm i @ngrx/component-store`
//   2. * Think: the state of what properties do we need to maintain?
//      Then, create an interface `OperationsState` that houses them
//      When done, cross-check with Accelerator#1.2 below
//   3. * What would the default (initial) value be for each property?
//      Create an object `defaultState` of type `OperationsState`
//      that sets them right
//   4. Although an Injectable, we don't need the store at the `root`
//      level; its' needed only in the `providers` list at the component
//      that needs it; it's children will have access to it naturally;
//      make it just an @Injectable()
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

  // leave this as is, you'll need it later
  private orderMap = new Map<number, OrderItem>;

  // TODO-3:
  //   1. Extending a parent? then `super(...)` initialize it
  //      with your default object

  // TODO-5: (*** do TODO-4 first ***)
  //   1. Let's `loadProducts()` in the constructor so that `products` is
  //      loaded and ready in the components that need it
  constructor() {
  }

  // TODO-4:
  //   1. * Our most important property is `products`. Only after its set
  //      can we view the Boutique, keep selecting `orderItem`s with some
  //      `quantity`, to make an overall `order`, calculate its `paymentDue`
  //      and keep our total `earnings` in check after every payment.
  //      So, let's create a `setState` method that immutably returns the state,
  //      but overrides the default setting with our list of fresh `products`

  // TODO-6:
  //   1. * `products` is state-managed, so if we create a selector for it,
  //      it's instantly available for any subscriber (here or in components).
  //      Create the selector for it. Should be the same name + $.
  //   2. While we're at it, create a selector for `earnings$` too.
  //   3. You need two more... go for them right now

  // TODO-18:
  //   At this time, you have have an error-free running app since all selectors
  //   are nicely available. What's needed now is to sync data up upon receiving
  //   events form the UI. Let's handle what happens when an `addOrder()`
  //   is triggered:
  //   1. [done] create a readonly `addOrderItem` method that receives the `quantity` and
  //      the `product` ordered
  //   2. get a `newOrderItem` by calling the `createOrderItem` method
  //   3. using `product.id` as key, "set" (add/modify) your `newOrderItem` in the `orderMap`
  //   4. * tune the `order` with the `getOrderItemsWithQuantity` method; this refinement
  //      is needed when the Buyer selects a quantity and then zeros it out;
  //      we don't need to see orderItems with 0 quantity in the Buyer's table
  //   That's it! We now have `order` sync'ed up, which also means we can know
  //   the `paymentDue` should the Buyer decides to `makePayment()`, so:
  //   5. patch the state of `order` with what you got in the previous step, and
  //   6. * patch the state of `paymentDue` using the help of `getPaymentDue(...) method.
  //   Now, suddenly, you should see both the Buyer's table and the running total get
  //   updated with every new order made (i.e., upon `blur` events)!
  //   Why? Because they're sync'ed through `order$` and `paymentDue$`

  readonly addOrderItem = (quantity: number, product: Product) => {
    // issue the five statements needed here
  }

  // TODO-19:
  //   1. [done] create a `makePayment()` method that when
  //      the Buyer clicks the buy (shop-cart) button:
  //   2. * use RxJS' zip() on `earnings$` and `paymentDue$`
  //   3. patchState of `earnings` by adding zip's observables
  //   we can now:
  //   4. patchState of `paymentDue` to be zero
  //   5. patchState of `order` to []
  //   6. call the `updateSales()` method

  readonly makePayment = () => {
    // fill me in...
  }

    // TODO-20:
  //   * Re-write the `updateSales() method that does this:
  //   1. subscribe to `products$` to fetch them
  //   2. use `updateSoldProperty()` to update products table.
  //      Here, the `quantity` of every sold product in the order is
  //      added to the overall `sold` property.
  //   3. we're done with `orderMap` for the order made, clear it
  //   4. use the `productsUpdate` updater to update products to []
  //   5. use the `productsUpdate` updater to update products to `products`
  //      We need instruction 4 to allow us to reset the UI's DOM; otherwise,
  //      those `quantity` fields (which are not part of the Product model)
  //      will not get cleared. Appreciate how fast this happens!
  //      No need to create BehaviorSubject, emit here and subscribe there.

  updateSales(order: OrderItem[]) {
    updateSoldProperty(this.products, order);
  }
}


// ====================== Accelerators =================================

// 1.2 `OperationsState` should manage
//     `products: Product[]`, `order: OrderItem[]`,
//     `earnings: number` and `paymentDue:number`

// 1.3 const defaultState: OperationsState = { products: [], order: [],
//     earnings: 0, paymentDue: 0}

// 2.1 export class OperationsService extends ComponentStore<OperationsState> {

// 4.1   readonly loadProducts = () => this.setState((state) => ({
//         ...state,
//         products: this.products
//       }));

// 6.1   readonly products$ = this.select(({products}) => products);    or equally:
//       readonly products$ = this.select(state => state.products);

// 18.4  const order = getOrderItemsWithQuantity([...this.orderMap.values()]);

// 18.6  this.patchState({paymentDue: getPaymentDue(order)}); (shortest style)
//       see https://ngrx.io/guide/component-store/write for other styles

// 19.2     zip(this.earnings$, this.paymentDue$)
//           .pipe(
//             take(1),
//             map(pair => pair[0] + pair[1])
//            )
//           .subscribe(earnings => {...

// 20:   readonly updateSales = () => {
//     this.products$
//       .pipe(take(1))
//       .subscribe(products => {
//         updateSoldProperty(products, [...this.orderMap.values()]);
//         this.orderMap.clear();
//         this.productsUpdate([]);
//         this.productsUpdate(products);
//       });
//   };
