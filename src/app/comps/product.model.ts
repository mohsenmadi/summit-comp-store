import { OrderItem } from "./order-item.model";

export interface Product {
  id: number;
  sold: number;
  name: string;
  cost: number;
}

export const updateSoldProperty = (products: Product[], order: OrderItem[]) =>
  order.forEach(orderItem => {
    const product: any =
      products.find(product => product.id === orderItem.id);
    product.sold += orderItem.quantity;
  });
