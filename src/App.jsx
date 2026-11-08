import { useEffect, useState } from "react";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

// Simple hash routing: "#/dashboard" shows the admin preview,
// everything else (including section links like "#catalogue") shows the homepage.
function useRoute() {
  const read = () => (window.location.hash.startsWith("#/dashboard") ? "dashboard" : "home");
  const [route, setRoute] = useState(read);

  useEffect(() => {
    const onChange = () => {
      const next = read();
      setRoute((prev) => {
        if (prev !== next) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export default function App() {
  const route = useRoute();
  return (
    <CartProvider>
      {route === "dashboard" ? <Dashboard /> : <Home />}
    </CartProvider>
  );
}
