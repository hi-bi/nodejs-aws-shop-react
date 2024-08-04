import * as Yup from "yup";
import { Product } from "~/models/Product";

export const CartItemSchema = Yup.object({
  product_id: Yup.string().uuid().required(),
  count: Yup.number().integer().min(0).required(),
});

export type CartItem = Yup.InferType<typeof CartItemSchema>;

export type CartProductItem = CartItem & { product: Product}
