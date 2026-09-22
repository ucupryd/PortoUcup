import { createBrowserRouter, Navigate } from "react-router";
import { lazy } from "react";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { AdminLayout } from "./components/AdminLayout";

const Tentang = lazy(() => import("./pages/Tentang"));
const Pengalaman = lazy(() => import("./pages/Pengalaman"));
const Karya = lazy(() => import("./pages/Karya"));
const Testimoni = lazy(() => import("./pages/Testimoni"));
const Kontak = lazy(() => import("./pages/Kontak"));
const Monitoring = lazy(() => import("./pages/Monitoring"));
const CctvMonitoring = lazy(() => import("./pages/CctvMonitoring"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/AdminProjects"));
const AdminProjectForm = lazy(() => import("./pages/AdminProjectForm"));

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
      { path: "auth", Component: Auth },
      { path: "dashboard", element: <Navigate to="/monitoring" replace /> },
      { 
        path: "monitoring", 
        element: (
          <ProtectedRoute>
            <Monitoring />
          </ProtectedRoute>
        )
      },
      {
        path: "cctv-monitoring",
        element: (
          <ProtectedRoute>
            <CctvMonitoring />
          </ProtectedRoute>
        )
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        ),
        children: [
          { index: true, Component: AdminDashboard },
          { path: "projects", Component: AdminProjects },
          { path: "projects/new", Component: AdminProjectForm },
          { path: "projects/:id/edit", Component: AdminProjectForm },
        ],
      },
    ],
  },
]);
