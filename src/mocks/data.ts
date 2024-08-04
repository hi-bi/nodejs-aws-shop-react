import { OrderStatus } from "~/constants/order";
import { CartStatus } from "~/models/Cart";
import { Order } from "~/models/Order";
import { AvailableProduct, Product } from "~/models/Product";
import { CartResponse } from "~/queries/cart";

export const products: Product[] = [
  {
    description: "Short Product Description1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "ProductOne",
    image: "https://example.com/product1.jpg",
  },
  {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    title: "ProductTitle",
    image: "https://example.com/product2.jpg",
  },
  {
    description: "Short Product Description2",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    title: "Product",
    image: "https://example.com/product3.jpg",
  },
  {
    description: "Short Product Description4",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    title: "ProductTest",
    image: "https://example.com/product4.jpg",
  },
  {
    description: "Short Product Descriptio1",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    title: "Product2",
    image: "https://example.com/product5.jpg",
  },
  {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "ProductName",
    image: "https://example.com/product6.jpg",
  },
];

export const availableProducts: AvailableProduct[] = products.map(
  (product, index) => ({ ...product, count: index + 1 })
);

export const cartResponse: CartResponse = {
  data: {
    cart: {
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80ab",
      status: CartStatus.OPEN,
      items: [
        {
          product_id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
          count: 2,
        },
        {
          product_id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
          count: 5,
        },
      ],
    },
  },
}

export const orders: Order[] = [
  {
    id: "1",
    delivery: {
      address: "some address",
      firstName: "Name",
      lastName: "Surname",
      comment: "",
    },
    items: [
      {
        product_id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        count: 2,
      },
      {
        product_id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
        count: 5,
      },
    ],
    statusHistory: [
      { status: OrderStatus.Open, timestamp: Date.now(), comment: "New order" },
    ],
  },
  {
    id: "2",
    delivery: {
      address: "another address",
      firstName: "John",
      lastName: "Doe",
      comment: "Ship fast!",
    },
    items: [{ product_id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 3 }],
    statusHistory: [
      {
        status: OrderStatus.Sent,
        timestamp: Date.now(),
        comment: "Fancy order",
      },
    ],
  },
];
