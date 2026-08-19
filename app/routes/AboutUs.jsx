import { Welcome } from "../welcome/App";

export function meta({}) {
  return [
    { title: "Paradise" },
    { name: "description", content: "Bienvenido a Paradise" },
  ];
}

export default function Home() {
  return <Welcome />;
}
