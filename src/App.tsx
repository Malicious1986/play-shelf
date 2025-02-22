import "./App.css";
import GameCollection from "@/components/gameCollection";
import Header from "@/components/header";
import { Route, Routes } from "react-router-dom";
import Home from "@/components/home";
import { ThemeProvider } from "@/components/theme-provider";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient"; // Import Apollo Client
import AuthSuccess from "./components/authSuccess";

function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <ThemeProvider storageKey="vite-ui-theme">
        <Header />

        <main className="mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GameCollection />} />
            <Route path="/about" element={<div>About</div>} />
            <Route path="/auth-success" element={<AuthSuccess />} />

          </Routes>
        </main>

        <footer></footer>
      </ThemeProvider>
    </ApolloProvider>
    </>
  );
}

export default App;
