import "@/App.css";
import Header from "@/components/header";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { ApolloProvider } from "@apollo/client";
import client from "@/apolloClient";
import { lazy, Suspense } from "react";
import Footer from "@/components/footer";
import PrivateRoute from "@/pages/privateRoute";
import SharedGames from "./pages/sharedGames";

const Games = lazy(() => import("@/pages/gameCollection"));
const GameDetails = lazy(() => import("@/pages/gameDetails"));
const Home = lazy(() => import("@/pages/home"));
const AuthSuccess = lazy(() => import("@/components/authSuccess"));
const PageNotFound = lazy(() => import("@/pages/pageNotFound"));

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider storageKey="vite-ui-theme">
          <Header />

          <main className={`mt-16 main-content`}>
            <Suspense>
              <Routes>
                <Route element={<PrivateRoute />}>
                  <Route path="/about" element={<div>About</div>} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/games/:id" element={<GameDetails />} />
                </Route>
                <Route path="/" element={<Home />} />
                <Route path="/shared/:shareId" element={<SharedGames />} />
                <Route path="/auth-success" element={<AuthSuccess />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
