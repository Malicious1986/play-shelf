// src/pages/GameDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_GAME_DETAILS } from "@/graphql/queries";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import GameRating from "@/components/gameRating";
import { UPDATE_GAME_RATE } from "@/graphql/mutations";

export default function GameDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [updateRate] = useMutation(UPDATE_GAME_RATE);

  const { loading, error, data } = useQuery(GET_GAME_DETAILS, {
    variables: { id },
  });

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin w-16 h-16 text-white" />
        <p className="text-lg text-white">Loading game details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <p className="text-red-500">Error loading game details. Please try again.</p>
      </div>
    );
  }

  const { name, description, image, category, rating } = data.game;
  const handleRate = async (newRating: number) => {
    await updateRate({ variables: { updateGameInput: { id, rating: newRating } } });
  };
  return (
    <div className="container mx-auto p-6">
      <Button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center space-x-2"
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Game Image */}
        <div className="flex justify-center">
          <img
            src={image}
            alt={name}
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Game Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          <p className="text-gray-400 mb-4">{description || "No description available."}</p>
          <p className="mb-4">
            <strong>Category:</strong> {category || "Uncategorized"}
          </p>
          <div className="flex items-center space-x-1 mb-4">
            <strong>Rating:</strong>
            <GameRating rating={rating} onRate={handleRate} />
          </div>
        </div>
      </div>
    </div>
  );
}
