import { useCart } from "../../core/context/CartContext";
import "./cart.css"; // Importamos los estilos LESS

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalAmount,
    cartCount,
  } = useCart();

  return (
    <div className="cart-page">
      <h1 className="cart-title">Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart-message">
          <h2>Tu carrito está vacío 🛒</h2>
          <p>Agrega algunas plantas desde la tienda para verlas aquí.</p>
        </div>
      ) : (
        <>
          <section className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Info del producto */}
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
                      Subtotal: ${item.price * item.quantity}
                    </p>
                  </div>
                </div>

                <div className="quantity-controls">
                  <div className="quantity-buttons">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="quantity-btn quantity-btn--green"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
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
              <button onClick={clearCart} className="clear-cart-btn">
                Vaciar Carrito
              </button>
              <button
                onClick={() =>
                  alert("¡Gracias por tu compra en Guardería Paraíso!")
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
