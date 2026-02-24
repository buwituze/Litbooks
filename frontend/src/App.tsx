import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { router } from "./routes";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { FullPageLoader } from "./components/common/LoadingSpinner";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Suspense fallback={<FullPageLoader />}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
