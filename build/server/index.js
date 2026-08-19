import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/@react-router/dev/dist/config/defaults/entry.server.node.tsx
var entry_server_node_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		let userAgent = request.headers.get("user-agent");
		let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error) {
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
//#endregion
//#region core/context/CartContext.tsx
var CartContext = createContext(void 0);
var CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const addToCart = (product) => {
		setCartItems((prevItems) => {
			if (prevItems.find((item) => item.id === product.id)) return prevItems.map((item) => item.id === product.id ? {
				...item,
				quantity: item.quantity + 1
			} : item);
			return [...prevItems, {
				...product,
				quantity: 1
			}];
		});
	};
	const removeFromCart = (id) => {
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};
	const updateQuantity = (id, delta) => {
		setCartItems((prev) => prev.map((item) => {
			if (item.id === id) {
				const newQty = item.quantity + delta;
				return newQty > 0 ? {
					...item,
					quantity: newQty
				} : item;
			}
			return item;
		}));
	};
	const clearCart = () => setCartItems([]);
	const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
	const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	return /* @__PURE__ */ jsx(CartContext.Provider, {
		value: {
			cartItems,
			addToCart,
			removeFromCart,
			updateQuantity,
			clearCart,
			cartCount,
			totalAmount
		},
		children
	});
};
var useCart = () => {
	const context = useContext(CartContext);
	if (!context) throw new Error("useCart debe usarse dentro de un CartProvider");
	return context;
};
//#endregion
//#region app/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	Layout: () => Layout,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
	}
];
function Layout({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", { children: [
			children,
			/* @__PURE__ */ jsx(ScrollRestoration, {}),
			/* @__PURE__ */ jsx(Scripts, {})
		] })]
	});
}
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsx(CartProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) });
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack;
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", {
		className: "pt-16 p-4 container mx-auto",
		children: [
			/* @__PURE__ */ jsx("h1", { children: message }),
			/* @__PURE__ */ jsx("p", { children: details }),
			stack
		]
	});
});
//#endregion
//#region app/welcome/App.tsx
function Welcome() {
	return /* @__PURE__ */ jsx("main", {
		className: "flex items-center justify-center pt-16 pb-4",
		style: {
			backgroundImage: "url(\"/fondo-botanico.jpg\")",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			minHeight: "100vh",
			backgroundAttachment: "fixed",
			backgroundColor: "#f0f0f0"
		},
		children: /* @__PURE__ */ jsxs("section", {
			className: "container_dashboard",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "container_welcome",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "container_title",
						children: "Bienvenido a Paradise"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "description",
						children: "Bienvenidos a Paradise"
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/products",
						className: "btn-primary",
						children: "Ver Productos"
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "container_text",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "title",
						children: " Bienvenido a Paradise"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "description",
						children: "Hola somos Paradise una empresa  natural dedicada a la venta de productos naturales y orgánicos, con el objetivo de brindar bienestar y salud a nuestros clientes. Nos especializamos en ofrecer productos de alta calidad, cultivados de manera sostenible y respetuosa con el medio ambiente. Nuestro compromiso es proporcionar opciones saludables y nutritivas que promuevan un estilo de vida equilibrado y consciente."
					}),
					/* @__PURE__ */ jsx("p", {
						className: "finally",
						children: "Recuerda que puedes comprar nuestros productos en línea o en nuestras tiendas físicas."
					})
				]
			})]
		})
	});
}
//#endregion
//#region app/routes/home.tsx
var home_exports = /* @__PURE__ */ __exportAll({
	default: () => home_default,
	meta: () => meta$2
});
function meta$2({}) {
	return [{ title: "New React Router App" }, {
		name: "description",
		content: "Welcome to React Router!"
	}];
}
var home_default = UNSAFE_withComponentProps(function Home() {
	return /* @__PURE__ */ jsx(Welcome, {});
});
//#endregion
//#region app/products/ProductList.tsx
var products = [
	{
		id: 1,
		label: "En venta",
		title: "Planta numero 1",
		name: "Planta numero 1",
		price: 100,
		image: "/plant1.jpeg",
		description: "Descripción de la planta número 1"
	},
	{
		id: 2,
		label: "En venta",
		title: "Planta numero 2",
		name: "Planta numero 2",
		price: 150,
		image: "/plant2.jpeg",
		description: "Descripción de la planta número 2"
	},
	{
		id: 3,
		label: "En venta",
		title: "Planta numero 3",
		name: "Planta numero 3",
		price: 200,
		image: "/plant3.jpeg",
		description: "Descripción de la planta número 3"
	},
	{
		id: 4,
		label: "En venta",
		title: "Planta numero 1",
		name: "Planta numero 1",
		price: 100,
		image: "/plant1.jpeg",
		description: "Descripción de la planta número 1"
	},
	{
		id: 5,
		label: "En venta",
		title: "Planta numero 2",
		name: "Planta numero 2",
		price: 150,
		image: "/plant2.jpeg",
		description: "Descripción de la planta número 2"
	},
	{
		id: 6,
		label: "En venta",
		title: "Planta numero 3",
		name: "Planta numero 3",
		price: 200,
		image: "/plant3.jpeg",
		description: "Descripción de la planta número 3"
	}
];
function Products() {
	const { addToCart } = useCart();
	return /* @__PURE__ */ jsxs("div", {
		className: "main_container",
		children: [/* @__PURE__ */ jsx("p", {
			className: "products_container_title",
			children: "Nuestras Plantas"
		}), /* @__PURE__ */ jsx("section", {
			className: "products_list",
			children: products.map((product) => /* @__PURE__ */ jsx(ProductCard, {
				product,
				addToCart
			}, product.id))
		})]
	});
}
function ProductCard({ product, addToCart }) {
	const [isDisabled, setIsDisabled] = useState(false);
	const handleAddToCart = () => {
		addToCart(product);
		setIsDisabled(true);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "product_card",
		children: [
			product.label && /* @__PURE__ */ jsx("span", {
				className: "product_card_label",
				children: product.label
			}),
			/* @__PURE__ */ jsx("p", {
				className: "product_title",
				children: product.title
			}),
			/* @__PURE__ */ jsx("img", {
				src: product.image,
				alt: product.name,
				className: "product_image"
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "product_name",
				children: product.name
			}),
			/* @__PURE__ */ jsx("p", {
				className: "product_description",
				children: product.description
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "product_price",
				children: ["$", product.price]
			}),
			/* @__PURE__ */ jsx("button", {
				className: `btn-primary ${isDisabled ? "btn-disabled" : ""}`,
				onClick: handleAddToCart,
				disabled: isDisabled,
				children: "Agregar al carrito"
			})
		]
	});
}
//#endregion
//#region app/components/Nabvar/Header.tsx
function Nabvar() {
	const { cartCount } = useCart();
	return /* @__PURE__ */ jsx("header", {
		className: "main-header",
		children: /* @__PURE__ */ jsxs("nav", {
			className: "main-nav",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "brand-logo",
					children: [/* @__PURE__ */ jsx("img", {
						src: "/logo.png",
						alt: "Paradise Logo",
						className: "brand-logo-img"
					}), "Paradise Nursey"]
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "nav-list",
					children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/products",
						className: "nav-link",
						children: "Plantas"
					}) })
				}),
				/* @__PURE__ */ jsxs(Link, {
					to: "/cart",
					className: "nav-link cart-link relative",
					children: [/* @__PURE__ */ jsx("img", {
						src: "/cart.png",
						alt: "Carrito de compras",
						className: "h-6 w-6"
					}), cartCount > 0 && /* @__PURE__ */ jsx("span", {
						className: "cart-badge absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center",
						children: cartCount
					})]
				})
			]
		})
	});
}
//#endregion
//#region app/routes/products.tsx
var products_exports = /* @__PURE__ */ __exportAll({
	default: () => products_default,
	meta: () => meta$1
});
function meta$1() {
	return [{ title: "Paradise - Productos" }, {
		name: "description",
		content: "Explora nuestra selección de productos naturales y orgánicos."
	}];
}
var products_default = UNSAFE_withComponentProps(function ProductsRoute() {
	return /* @__PURE__ */ jsxs("section", { children: [/* @__PURE__ */ jsx(Nabvar, {}), /* @__PURE__ */ jsx(Products, {})] });
});
//#endregion
//#region app/cart/CartSlice.tsx
function Cart() {
	const { cartItems, updateQuantity, removeFromCart, clearCart, totalAmount, cartCount } = useCart();
	return /* @__PURE__ */ jsxs("div", {
		className: "cart-page",
		children: [/* @__PURE__ */ jsx("h1", {
			className: "cart-title",
			children: "Carrito de Compras"
		}), cartItems.length === 0 ? /* @__PURE__ */ jsxs("div", {
			className: "empty-cart-message",
			children: [/* @__PURE__ */ jsx("h2", { children: "Tu carrito está vacío 🛒" }), /* @__PURE__ */ jsx("p", { children: "Agrega algunas plantas desde la tienda para verlas aquí." })]
		}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
			className: "cart-items-list",
			children: cartItems.map((item) => /* @__PURE__ */ jsxs("div", {
				className: "cart-item",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "product-info",
					children: [/* @__PURE__ */ jsx("img", {
						src: item.image,
						alt: item.name,
						className: "product-image"
					}), /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h3", {
							className: "product-name",
							children: item.name
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "unit-price",
							children: ["Precio unitario: ", /* @__PURE__ */ jsxs("strong", { children: ["$", item.price] })]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "subtotal-price",
							children: ["Subtotal: $", item.price * item.quantity]
						})
					] })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "quantity-controls",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "quantity-buttons",
						children: [
							/* @__PURE__ */ jsx("button", {
								onClick: () => updateQuantity(item.id, -1),
								className: "quantity-btn",
								children: "-"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "quantity-display",
								children: item.quantity
							}),
							/* @__PURE__ */ jsx("button", {
								onClick: () => updateQuantity(item.id, 1),
								className: "quantity-btn quantity-btn--green",
								children: "+"
							})
						]
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => removeFromCart(item.id),
						className: "remove-item-btn",
						children: "Eliminar"
					})]
				})]
			}, item.id))
		}), /* @__PURE__ */ jsxs("div", {
			className: "cart-summary",
			children: [
				/* @__PURE__ */ jsxs("p", {
					className: "selected-plants-count",
					children: ["Plantas seleccionadas: ", /* @__PURE__ */ jsx("strong", { children: cartCount })]
				}),
				/* @__PURE__ */ jsxs("h2", {
					className: "total-amount",
					children: ["Total a pagar: $", totalAmount]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "cart-actions",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: clearCart,
						className: "clear-cart-btn",
						children: "Vaciar Carrito"
					}), /* @__PURE__ */ jsx("button", {
						onClick: () => alert("¡Gracias por tu compra en Guardería Paraíso!"),
						className: "pay-button",
						children: "Pagar"
					})]
				})
			]
		})] })]
	});
}
//#endregion
//#region app/routes/cart.tsx
var cart_exports = /* @__PURE__ */ __exportAll({
	default: () => cart_default,
	meta: () => meta
});
function meta() {
	return [{ title: "Paradise - Carrito" }, {
		name: "description",
		content: "Tu carrito de compras en Paradise."
	}];
}
var cart_default = UNSAFE_withComponentProps(function CartRoute() {
	return /* @__PURE__ */ jsxs("section", { children: [
		/* @__PURE__ */ jsx(Nabvar, {}),
		" ",
		/* @__PURE__ */ jsx(Cart, {})
	] });
});
//#endregion
//#region \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-BAnwF36G.js",
		"imports": ["/assets/jsx-runtime-CZWrFQDu.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-B0zQD2Mw.js",
			"imports": [
				"/assets/jsx-runtime-CZWrFQDu.js",
				"/assets/lib-DS6NuS64.js",
				"/assets/CartContext-B2H6EUpF.js"
			],
			"css": ["/assets/root-D9qUBXyS.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home--GPM4S2y.js",
			"imports": ["/assets/jsx-runtime-CZWrFQDu.js", "/assets/lib-DS6NuS64.js"],
			"css": ["/assets/home-C-u8B-Fg.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/products": {
			"id": "routes/products",
			"parentId": "root",
			"path": "products",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/products-D0D8z58T.js",
			"imports": [
				"/assets/jsx-runtime-CZWrFQDu.js",
				"/assets/CartContext-B2H6EUpF.js",
				"/assets/Header-aQgv0-47.js",
				"/assets/lib-DS6NuS64.js"
			],
			"css": ["/assets/products-BgJPAB8S.css", "/assets/Header-BfUTRzL_.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/cart": {
			"id": "routes/cart",
			"parentId": "root",
			"path": "cart",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/cart-JzUBrc_h.js",
			"imports": [
				"/assets/jsx-runtime-CZWrFQDu.js",
				"/assets/CartContext-B2H6EUpF.js",
				"/assets/Header-aQgv0-47.js",
				"/assets/lib-DS6NuS64.js"
			],
			"css": ["/assets/cart-CgUxMxyt.css", "/assets/Header-BfUTRzL_.css"],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-83e60f4c.js",
	"version": "83e60f4c",
	"sri": void 0
};
//#endregion
//#region \0virtual:react-router/server-build
var assetsBuildDirectory = "build/client";
var basename = "/";
var future = {
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = true;
var isSpaMode = false;
var prerender = [];
var routeDiscovery = {
	"mode": "lazy",
	"manifestPath": "/__manifest"
};
var publicPath = "/";
var entry = { module: entry_server_node_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: home_exports
	},
	"routes/products": {
		id: "routes/products",
		parentId: "root",
		path: "products",
		index: void 0,
		caseSensitive: void 0,
		module: products_exports
	},
	"routes/cart": {
		id: "routes/cart",
		parentId: "root",
		path: "cart",
		index: void 0,
		caseSensitive: void 0,
		module: cart_exports
	}
};
var allowedActionOrigins = false;
//#endregion
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
