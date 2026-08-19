import { Products } from "../products/ProductList";
import { Nabvar } from "../components/Nabvar/Header";
export function meta() {
  return [
    { title: "Paradise - Productos" },
    {
      name: "description",
      content: "Explora nuestra selección de productos naturales y orgánicos.",
    }, // Descripción más específica
  ];
}

export default function ProductsRoute() {
  return (
    <section>
      <Nabvar />
      <Products />
    </section>
  );
}
