import * as Yup from "yup";

export const ProductSchema = Yup.object({
  id: Yup.string().uuid().required().default(""),
  title: Yup.string().required().default(""),
  description: Yup.string().default(""),
  price: Yup.number().positive().required().defined().default(0),
  image: Yup.string().url().default(""),
});

export const StockSchema = Yup.object({
  count: Yup.number().integer().min(0).required().defined().default(0),
});

export const AvailableProductSchema = ProductSchema.concat(StockSchema);

export type Product = Yup.InferType<typeof ProductSchema>;
export type AvailableProduct = Yup.InferType<typeof AvailableProductSchema>;