import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDb = async (order: Order) => {
  const result = OrderModel.create(order);
  return result;
};

const getAllOrderFromDb = async (searchParams: any) => {
  if (searchParams === undefined) {
    const result = OrderModel.find();
    return result;
  } else {
    const result = await OrderModel.find({ email: searchParams });
    return result;
  }
};

export const OrderServices = {
  createOrderIntoDb,
  getAllOrderFromDb,
};
