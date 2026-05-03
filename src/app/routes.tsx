import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Tentang from "./pages/Tentang";
import Pengalaman from "./pages/Pengalaman";
import Karya from "./pages/Karya";
import Testimoni from "./pages/Testimoni";
import Kontak from "./pages/Kontak";
import Monitoring from "./pages/Monitoring";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "tentang", Component: Tentang },
      { path: "pengalaman", Component: Pengalaman },
      { path: "karya", Component: Karya },
      { path: "testimoni", Component: Testimoni },
      { path: "kontak", Component: Kontak },
      { 
        path: "monitoring", 
        element: (
          <ProtectedRoute>
            <Monitoring />
          </ProtectedRoute>
        )
      },
    ],
  },
]);
