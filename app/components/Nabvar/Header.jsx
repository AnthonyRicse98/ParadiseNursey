import { Link } from "react-router";
import { useSelector } from "react-redux";
import "./Header.css";

export function Nabvar() {
  // Leemos los productos directamente desde la store de Redux
  const cartItems = useSelector((state) => state.cart.items);
  
  // Calculamos el total de plantas acumuladas
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="main-header">
      <nav className="main-nav">
        <Link to="/" className="brand-logo">
          <img src="/logo.png" alt="Paradise Logo" className="brand-logo-img" />
          Paradise Nursery
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