import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import { ApolloProvider } from "@apollo/client";
import client from "@/apolloClient";
import { ThemeProvider } from "@/components/theme-provider";

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
