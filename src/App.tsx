import "@/App.css";
import Header from "@/components/header";
import { Route, Routes } from "react-router-dom";

import { lazy, Suspense } from "react";
import Footer from "@/components/footer";
import PrivateRoute from "@/pages/privateRoute";
import SharedGames from "./pages/sharedGames";

const Games = lazy(() => import("@/pages/gameCollection"));
const GameDetails = lazy(() => import("@/pages/gameDetails"));
const Home = lazy(() => import("@/pages/home"));
const AuthSuccess = lazy(() => import("@/components/authSuccess"));
const PageNotFound = lazy(() => import("@/pages/pageNotFound"));
const Register = lazy(() => import("@/pages/register"));
const ForgotPassword = lazy(() => import("@/pages/forgotPassword"));

function App() {
  return (
    <>
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
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;
