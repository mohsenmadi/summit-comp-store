import { Product } from "./product.model";

export interface OrderItem {
  id: number;
  cost: number;
  name: string;
  quantity: number;
}

export const createOrderItem = (quantity: number, product: Product) => {
  return {
    id: product.id,
    quantity: quantity,
    cost: product.cost,
    name: product.name
  } as OrderItem;
};

export const getPaymentDue = (order: OrderItem[]) =>
  order?.reduce((acc, order) =>
    acc + order.cost * order.quantity, 0);

export const getOrderItemsWithQuantity = (order: OrderItem[]) =>
  order?.filter(order => order.quantity > 0);
