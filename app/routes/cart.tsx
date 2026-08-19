import type { Route } from "../+types/root"; 
import Cart from "../cart/CartSlice";
import { Nabvar } from "../components/Nabvar/Header";
export function meta() {
  return [
    { title: "Paradise - Carrito" },
    { name: "description", content: "Tu carrito de compras en Paradise." }, // Descripción más específica
  ];
}

export default function CartRoute() {
    return <section>
        <Nabvar /> {/* El Navbar se renderiza aquí */}
        <Cart />
    </section>;
}
