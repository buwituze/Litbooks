import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import authReducer from "../features/auth/authSlice";
import booksReducer from "../features/books/booksSlice";

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      books: booksReducer,
    },
    preloadedState: initialState,
  });
};

describe("HomePage", () => {
  it("renders welcome message", () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(/Welcome to Litbooks/i)).toBeInTheDocument();
  });

  it("shows login/signup buttons when not authenticated", () => {
    const store = createMockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText("Get Started")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
