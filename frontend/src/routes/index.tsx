import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const BooksPage = lazy(() => import("../pages/BooksPage"));
const BookDetailPage = lazy(() => import("../pages/BookDetailPage"));
const MyBooksPage = lazy(() => import("../pages/MyBooksPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "books",
        element: (
          <ProtectedRoute>
            <BooksPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "books/:id",
        element: (
          <ProtectedRoute>
            <BookDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <ProtectedRoute>
            <MyBooksPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routes);
