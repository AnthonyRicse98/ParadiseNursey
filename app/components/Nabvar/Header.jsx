import { Link } from "react-router";
import "./Header.css";
import { useCart } from "../../../core/context/CartSlice";
export function Nabvar() {
  const { cartCount } = useCart();
  return (
    <header className="main-header">
      <nav className="main-nav">
        <Link to="/" className="brand-logo">
          <img src="/logo.png" alt="Paradise Logo" className="brand-logo-img" />
          Paradise Nursey
        </Link>
        <ul className="nav-list">
          <li>
            <Link to="/products" className="nav-link">
              Plantas
            </Link>
          </li>
        </ul>
        <Link to="/cart" className="nav-link cart-link relative">
          <img src="/cart.png" alt="Carrito de compras" className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="cart-badge absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
