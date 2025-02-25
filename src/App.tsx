import "./App.css";
import Header from "@/components/header";
import { Route, Routes } from "react-router-dom";
import Home from "@/components/home";
import { ThemeProvider } from "@/components/theme-provider";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import AuthSuccess from "./components/authSuccess";
import { lazy, Suspense } from "react";

const Games = lazy(() => import("@/components/gameCollection"));

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider storageKey="vite-ui-theme">
          <Header />

          <main className="mt-16">
          <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games" element={<Games />} />
              <Route path="/about" element={<div>About</div>} />
              <Route path="/auth-success" element={<AuthSuccess />} />
            </Routes>
            </Suspense>
          </main>

          <footer></footer>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
