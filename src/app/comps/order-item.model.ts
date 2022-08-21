import { Product } from "./product.model";

export interface OrderItem {
  id: number;
  cost: number;
  name: string;
  quantity: number;
}

export const createOrderItem =
  (quantity: number, product: Product): OrderItem => {
    return {
      id: product.id,
      quantity: quantity,
      cost: product.cost,
      name: product.name
    };
  };

export const getPaymentDue = (order: OrderItem[]) =>
  order?.reduce((acc, orderItem) =>
    acc + orderItem.cost * orderItem.quantity, 0);

export const getOrderItemsWithQuantity = (order: OrderItem[]) =>
  order?.filter(orderItem => orderItem.quantity > 0);
