import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../core/store/CartSlice";

const products = [
  // Categoria 1: Plantas de Interior (6 plantas)
  {
    id: 1,
    category: "Plantas de Interior",
    name: "Monstera Deliciosa",
    price: 25,
    image: "/plant1.jpeg",
    description: "Hojas grandes y caladas ideales para interiores luminosos.",
  },
  {
    id: 2,
    category: "Plantas de Interior",
    name: "Lengua de Suegra",
    price: 18,
    image: "/plant2.jpeg",
    description: "Planta muy resistente y purificadora de aire.",
  },
  {
    id: 3,
    category: "Plantas de Interior",
    name: "Pothos Dorado",
    price: 15,
    image: "/plant3.jpeg",
    description: "Planta colgante de rápido crecimiento y fácil cuidado.",
  },
  {
    id: 4,
    category: "Plantas de Interior",
    name: "Ficus Lyrata",
    price: 35,
    image: "/plant1.jpeg",
    description: "Hojas en forma de violín, perfecta para decoración de salas.",
  },
  {
    id: 5,
    category: "Plantas de Interior",
    name: "Calathea Orbifolia",
    price: 22,
    image: "/plant2.jpeg",
    description: "Hojas anchas con llamativos patrones verdes y plateados.",
  },
  {
    id: 6,
    category: "Plantas de Interior",
    name: "Espatifilo (Cuna de Moisés)",
    price: 20,
    image: "/plant3.jpeg",
    description: "Hermosa flor blanca que filtra toxinas en el hogar.",
  },

  // Categoria 2: Plantas de Exterior (6 plantas)
  {
    id: 7,
    category: "Plantas de Exterior",
    name: "Lavanda",
    price: 12,
    image: "/plant1.jpeg",
    description: "Fragante y relajante con hermosas flores púrpuras.",
  },
  {
    id: 8,
    category: "Plantas de Exterior",
    name: "Rosal de Jardín",
    price: 28,
    image: "/plant2.jpeg",
    description: "Clásicas flores perfumadas para llenar de color tu jardín.",
  },
  {
    id: 9,
    category: "Plantas de Exterior",
    name: "Hortensia",
    price: 24,
    image: "/plant3.jpeg",
    description: "Grandes ramilletes de flores en tonos azules y rosados.",
  },
  {
    id: 10,
    category: "Plantas de Exterior",
    name: "Geranio",
    price: 10,
    image: "/plant1.jpeg",
    description: "Ideal para balcones y zonas con alta exposición solar.",
  },
  {
    id: 11,
    category: "Plantas de Exterior",
    name: "Jazmín del Cabo",
    price: 30,
    image: "/plant2.jpeg",
    description: "Arbusto de flores blancas con un aroma dulce intenso.",
  },
  {
    id: 12,
    category: "Plantas de Exterior",
    name: "Bougainvillea",
    price: 26,
    image: "/plant3.jpeg",
    description: "Planta trepadora de floración abundante y llamativa.",
  },

  // Categoria 3: Suculentas y Cactus (6 plantas)
  {
    id: 13,
    category: "Suculentas y Cactus",
    name: "Echeveria Elegans",
    price: 8,
    image: "/plant1.jpeg",
    description: "Suculenta en forma de roseta muy simétrica y decorativa.",
  },
  {
    id: 14,
    category: "Suculentas y Cactus",
    name: "Aloe Vera",
    price: 14,
    image: "/plant2.jpeg",
    description: "Planta medicinal clásica que requiere riegos mínimos.",
  },
  {
    id: 15,
    category: "Suculentas y Cactus",
    name: "Cactus Asiento de Suegra",
    price: 16,
    image: "/plant3.jpeg",
    description: "Cactus esférico resistente con espinas doradas.",
  },
  {
    id: 16,
    category: "Suculentas y Cactus",
    name: "Planta de Jade",
    price: 18,
    image: "/plant1.jpeg",
    description: "Suculenta leñosa tradicionalmente asociada a la prosperidad.",
  },
  {
    id: 17,
    category: "Suculentas y Cactus",
    name: "Cactus de Navidad",
    price: 15,
    image: "/plant2.jpeg",
    description: "Florece espectacularmente en temporadas frías.",
  },
  {
    id: 18,
    category: "Suculentas y Cactus",
    name: "Haworthia Fasciata",
    price: 10,
    image: "/plant3.jpeg",
    description: "Conocida como planta cebra por sus franjas blancas relucientes.",
  },
];

export default function ProductList() {
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
      <h1 className="products_container_title">Nuestras Plantas</h1>

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
  const cartItems = useSelector((state) => state.cart?.items || []);

  const itemInCart = cartItems.find((item) => item.id === product.id);
  const isDisabled = Boolean(itemInCart);

  return (
    <div className="product_card">
      <img src={product.image} alt={product.name} className="product_image" />
      <h3 className="product_name">{product.name}</h3>
      <p className="product_description">{product.description}</p>
      <p className="product_price">${product.price}</p>
      <button
        type="button"
        className={`btn-primary ${isDisabled ? "btn-disabled" : ""}`}
        onClick={() => dispatch(addItem(product))}
        disabled={isDisabled}
      >
        {isDisabled ? "Agregado al carrito" : "Agregar al carrito"}
      </button>
    </div>
  );
}