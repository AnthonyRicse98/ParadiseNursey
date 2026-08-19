import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Provider } from "react-redux";
import { store } from "../core/store/store";
import "./app.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export function ErrorBoundary({ error }) {
  let message = "¡Ups!";
  let details = "Ocurrió un error inesperado.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "La página solicitada no pudo ser encontrada."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre style={{ width: "100%", padding: "1rem", overflowX: "auto", backgroundColor: "#f4f4f4" }}>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}