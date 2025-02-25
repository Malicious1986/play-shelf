import { Game } from "@/models/game";
import { useMutation } from "@apollo/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GameRating from "@/components/gameRating";
import { Button } from "./ui/button";
import { DELETE_GAME, UPDATE_GAME_RATE } from "@/graphql/mutations";
import { GET_GAMES } from "@/graphql/queries";
import { useState } from "react";
import { EditGameDialog } from "./editGameDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";

export default function GameCard({
  name,
  description,
  image,
  rating,
  id,
  category,
}: Game) {
  const [editOpen, setEditOpen] = useState(false);
  const filters = useSelector((state: RootState) => state.filters.filters);
  const navigate = useNavigate();

  const [updateRate] = useMutation(UPDATE_GAME_RATE, {
    refetchQueries: [{ query: GET_GAMES, variables: filters }],
  });

  const [deleteGame] = useMutation(DELETE_GAME, {
    refetchQueries: [{ query: GET_GAMES, variables: filters }],
  });

  const setRateValue = async (newRating: number) => {
    await updateRate({ variables: { updateGameInput: { id, rating: newRating } } });
  };

  const handleRemove = async () => {
    await deleteGame({ variables: { id } });
  };

  const handleCardClick = () => {
    navigate(`/games/${id}`);
  };

  return (
    <>
      <Card className="flex flex-col hover:shadow-lg cursor-pointer" onClick={handleCardClick}>
        <CardHeader>
          <CardTitle className="truncate">{name}</CardTitle>
          <CardDescription className="h-10 line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex justify-center items-center">
          <img
            src={image}
            height={304}
            width={304}
            alt={name}
            className="rounded-md object-cover"
          />
        </CardContent>

        <CardFooter className="flex flex-col justify-between items-start gap-3 w-full">
          <GameRating rating={rating} onRate={setRateValue} />

          <div className="flex gap-2 w-full">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                setEditOpen(true);
              }}
            >
              Edit
            </Button>

            <Button
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              variant="destructive"
            >
              Remove
            </Button>
          </div>
        </CardFooter>
      </Card>

      {editOpen && (
        <EditGameDialog
          game={{ id, name, description, image, rating, category }}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
}
