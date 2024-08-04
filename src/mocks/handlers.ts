import { rest } from "msw";
import API_PATHS from "~/constants/apiPaths";
import {
  availableProducts,
  orders,
  products,
  cartResponse,
} from "~/mocks/data";
import { Order } from "~/models/Order";
import { AvailableProduct, Product } from "~/models/Product";
import { CartResponse } from "~/queries/cart";

export const handlers = [
  rest.get(`${API_PATHS.product}/products`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(), ctx.json<Product[]>(products));
  }),
  rest.put(`${API_PATHS.product}/products`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.delete(`${API_PATHS.product}/products/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${API_PATHS.product}/products/available`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json<AvailableProduct[]>(availableProducts)
    );
  }),
  rest.get(`${API_PATHS.product}/products/:id`, (req, res, ctx) => {
    const product = availableProducts.find((p) => p.id === req.params.id);
    if (!product) {
      return res(ctx.status(404));
    }
    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json<AvailableProduct>(product)
    );
  }),
  rest.get(`${API_PATHS.cart}/profile/cart`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json<CartResponse>(cartResponse)
    );
  }),
  rest.put(`${API_PATHS.cart}/profile/cart`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(),
      ctx.json<CartResponse>(cartResponse)
    );
  }),
  rest.get(`${API_PATHS.order}/order`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(), ctx.json<Order[]>(orders));
  }),
  rest.put(`${API_PATHS.order}/order`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${API_PATHS.order}/order/:id`, (req, res, ctx) => {
    const order = orders.find((p) => p.id === req.params.id);
    if (!order) {
      return res(ctx.status(404));
    }
    return res(ctx.status(200), ctx.delay(), ctx.json(order));
  }),
  rest.delete(`${API_PATHS.order}/order/:id`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put(`${API_PATHS.order}/order/:id/status`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];