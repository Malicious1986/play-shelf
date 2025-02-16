import "./App.css";
import GameCollection from "@/components/gameCollection";
import Header from "@/components/header";
import { Route, Routes } from "react-router-dom";
import Home from "@/components/home";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider storageKey="vite-ui-theme">
        <Header />

        <main className="mt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GameCollection />} />
            <Route path="/about" element={<div>About</div>} />
          </Routes>
        </main>

        <footer></footer>
      </ThemeProvider>
    </>
  );
}

export default App;
