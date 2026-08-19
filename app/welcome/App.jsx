import "./welcomel.css";
import { Link } from "react-router";

export function Welcome() {
  return (
    <main className="welcome-main">
      <section className="container_dashboard">
        <div className="container_welcome">
          <span className="container_title">Bienvenido a Paradise</span>
          <span className="description">Bienvenidos a Paradise</span>
          <Link to="/products" className="btn-primary">
            Ver Productos
          </Link>
        </div>
        <div className="container_text">
          <p className="title">Bienvenido a Paradise</p>
          <p className="description">
            Hola somos Paradise una empresa natural dedicada a la venta de
            productos naturales y orgánicos, con el objetivo de brindar
            bienestar y salud a nuestros clientes. Nos especializamos en ofrecer
            productos de alta calidad, cultivados de manera sostenible y
            respetuosa con el medio ambiente. Nuestro compromiso es proporcionar
            opciones saludables y nutritivas que promuevan un estilo de vida
            equilibrado y consciente.
          </p>
          <p className="finally">
            Recuerda que puedes comprar nuestros productos en línea o en
            nuestras tiendas físicas.
          </p>
        </div>
      </section>
    </main>
  );
}
