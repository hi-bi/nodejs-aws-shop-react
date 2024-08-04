import * as Yup from "yup";

import { CartItemSchema } from "./CartItem";

export enum CartStatus {
  OPEN = "OPEN",
  ORDERED = "ORDERED",
}

const CartSchema = Yup.object({
  id: Yup.string().uuid().required(),
  status: Yup.mixed<CartStatus>().oneOf(Object.values(CartStatus)).required(),
  items: Yup.array().of(CartItemSchema).required(),
});

export type Cart = Yup.InferType<typeof CartSchema>;