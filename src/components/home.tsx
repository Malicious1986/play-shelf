import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold md:text-6xl mb-4">
          🚂 Welcome to <span className="text-primary">Play Shelf</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Organize, track, and explore your board game collection in one place. 
          From classics to modern strategy games, your collection is now digital!
        </p>
        <Link to="/games">
          <Button className="mt-6 px-6 py-3 text-lg">🎲 View Collection</Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-card text-card-foreground rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">📦 Organize Your Games</h2>
          <p className="text-muted-foreground">Easily manage your board game collection with categories, details, and ratings.</p>
        </div>

        <div className="p-6 bg-card text-card-foreground rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">⭐ Rate & Review</h2>
          <p className="text-muted-foreground">Keep track of your favorite board games and rate them for quick reference.</p>
        </div>

        <div className="p-6 bg-card text-card-foreground rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">🛠️ Customizable Sorting</h2>
          <p className="text-muted-foreground">Sort by name, category, release date, and more to quickly find what you need.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Start Building Your Collection Today!</h2>
        <Link to="/games">
          <Button className="px-6 py-3 text-lg">📜 Explore Games</Button>
        </Link>
      </section>
    </div>
  );
}
