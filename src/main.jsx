import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { routes } from "./utils/routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
