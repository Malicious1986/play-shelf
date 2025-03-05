import "./index.css";

import { ApolloProvider } from "@apollo/client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import client from "@/apolloClient";
import { ThemeProvider } from "@/components/theme-provider";
import { store } from "@/store/store.ts";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ThemeProvider storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
