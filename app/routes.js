import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/AboutUs.jsx"),
  route("products", "routes/products.jsx"),
  route("cart", "routes/cart.jsx"),
];
