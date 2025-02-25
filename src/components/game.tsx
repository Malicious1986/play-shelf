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
import GameRateItem from "./gameRateItem";
import { Button } from "./ui/button";
import { DELETE_GAME, UPDATE_GAME_RATE } from "@/graphql/mutations";
import { GET_GAMES } from "@/graphql/queris";
import { useState } from "react";
import { EditGameDialog } from "./editGameDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
  const [updateRate] = useMutation(UPDATE_GAME_RATE, {
    refetchQueries: [{ query: GET_GAMES, variables: filters }],
  });

  const [deleteGame] = useMutation(DELETE_GAME, {
    refetchQueries: [{ query: GET_GAMES, variables: filters }],
  });

  const setRateValue = async (rating: number) => {
    await updateRate({ variables: { updateGameInput: { id, rating } } });
  };

  const handleRemove = async () => {
    await deleteGame({ variables: { id } });
  };

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
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
          <div className="flex justify-between w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <GameRateItem
                key={index}
                rateLevel={index}
                isActive={index < rating}
                setRateValue={setRateValue}
              />
            ))}
          </div>

          <div className="flex gap-2 w-full">
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => setEditOpen(true)} // ✅ Open Edit Dialog
            >
              Edit
            </Button>

            <Button
              className="flex-1"
              onClick={handleRemove}
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
