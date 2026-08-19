import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router";
import {
  updateQuantity,
  removeItem,
  clearCart,
} from "../../core/store/CartSlice";
import "./cart.css";

export default function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Cálculos en tiempo real
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1 className="cart-title">Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <h2>Tu carrito está vacío 🛒</h2>
          <p>Agrega algunas plantas desde la tienda para verlas aquí.</p>
          <Link to="/products" className="continue-shopping-btn">
            Ver Productos
          </Link>
        </div>
      ) : (
        <>
          <section className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="product-info">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                  />

                  <div>
                    <h3 className="product-name">{item.name}</h3>
                    <p className="unit-price">
                      Precio unitario: <strong>${item.price}</strong>
                    </p>
                    <p className="subtotal-price">
                      Subtotal: ${Number(item.price) * item.quantity}
                    </p>
                  </div>
                </div>

                <div className="quantity-controls">
                  <div className="quantity-buttons">
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, delta: -1 }))
                      }
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(updateQuantity({ id: item.id, delta: 1 }))
                      }
                      className="quantity-btn quantity-btn--green"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => dispatch(removeItem(item.id))}
                    className="remove-item-btn"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </section>

          <section className="cart-summary">
            <p className="selected-plants-count">
              Plantas seleccionadas: <strong>{cartCount}</strong>
            </p>
            <h2 className="total-amount">Total a pagar: ${totalAmount}</h2>

            <div className="cart-actions">
              <button
                type="button"
                onClick={() => dispatch(clearCart())}
                className="clear-cart-btn"
              >
                Vaciar Carrito
              </button>

              <Link to="/products" className="continue-shopping-btn">
                Continuar comprando
              </Link>

              <button
                type="button"
                onClick={() =>
                  alert("Próximamente: La pasarela de pago estará disponible muy pronto.")
                }
                className="pay-button"
              >
                Pagar
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}