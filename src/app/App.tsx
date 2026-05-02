import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ensure loader shows for at least one animation cycle (4s)
    const minMs = 4000;
    const start = performance.now();

    function finishIfReady() {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, minMs - elapsed);
      setTimeout(() => setLoading(false), remaining);
    }

    if (document.readyState === "complete") {
      finishIfReady();
    } else {
      window.addEventListener("load", finishIfReady, { once: true });
      return () => window.removeEventListener("load", finishIfReady);
    }
  }, []);

  if (loading) return <Loader />;

  return <RouterProvider router={router} />;
}
