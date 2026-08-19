import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../core/store/CartSlice";

const products = [
  {
    id: 1,
    category: "Plantas de Interior",
    label: "En venta",
    title: "Planta numero 1",
    name: "Planta numero 1",
    price: 100,
    image: "/plant1.jpeg",
    description: "Descripción de la planta número 1",
  },
  {
    id: 2,
    category: "Plantas de Interior",
    label: "En venta",
    title: "Planta numero 2",
    name: "Planta numero 2",
    price: 150,
    image: "/plant2.jpeg",
    description: "Descripción de la planta número 2",
  },
  {
    id: 3,
    category: "Plantas de Interior",
    label: "En venta",
    title: "Planta numero 3",
    name: "Planta numero 3",
    price: 200,
    image: "/plant3.jpeg",
    description: "Descripción de la planta número 3",
  },
  {
    id: 4,
    category: "Plantas de Exterior",
    label: "En venta",
    title: "Planta numero 4",
    name: "Planta numero 4",
    price: 100,
    image: "/plant1.jpeg",
    description: "Descripción de la planta número 4",
  },
  {
    id: 5,
    category: "Plantas de Exterior",
    label: "En venta",
    title: "Planta numero 5",
    name: "Planta numero 5",
    price: 150,
    image: "/plant2.jpeg",
    description: "Descripción de la planta número 5",
  },
  {
    id: 6,
    category: "Plantas de Exterior",
    label: "En venta",
    title: "Planta numero 6",
    name: "Planta numero 6",
    price: 200,
    image: "/plant3.jpeg",
    description: "Descripción de la planta número 6",
  },
];

export function Products() {
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="main_container">
      <p className="products_container_title">Nuestras Plantas</p>

      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="category_section">
          <h2 className="category_title">{category}</h2>
          <section className="products_list">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        </div>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const dispatch = useDispatch();
  // Leemos la lista de items directamente desde la store de Redux
  const cartItems = useSelector((state) => state.cart.items);
  
  const itemInCart = cartItems.find((item) => item.id === product.id);
  const isDisabled = Boolean(itemInCart);

  return (
    <div className="product_card">
      {product.label && (
        <span className="product_card_label">{product.label}</span>
      )}
      <p className="product_title">{product.title}</p>
      <img src={product.image} alt={product.name} className="product_image" />
      <h2 className="product_name">{product.name}</h2>
      <p className="product_description">{product.description}</p>
      <p className="product_price">${product.price}</p>
      <button
        className={`btn-primary ${isDisabled ? "btn-disabled" : ""}`}
        onClick={() => dispatch(addItem(product))} 
        disabled={isDisabled}
      >
        {isDisabled ? "Agregado al carrito" : "Agregar al carrito"}
      </button>
    </div>
  );
}