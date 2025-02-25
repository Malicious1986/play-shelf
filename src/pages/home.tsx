import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          From classics to modern strategy games, your collection is now
          digital!
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <Card>
          <CardHeader>
            <CardTitle>📦 Organize Your Games</CardTitle>
            <CardDescription>
              Easily manage your board game collection with categories, details,
              and ratings.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⭐ Rate & Review</CardTitle>
            <CardDescription>
              Keep track of your favorite board games and rate them for quick
              reference.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🛠️ Customizable Sorting</CardTitle>
            <CardDescription>
              Sort by name, category, release date, and more to quickly find
              what you need.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">
          Start Building Your Collection Today!
        </h2>
        <Link to="/games">
          <Button className="px-6 py-3 text-lg">📜 Explore Games</Button>
        </Link>
      </section>
    </div>
  );
}
