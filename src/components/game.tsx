import GameRating from "@/components/gameRating";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Game } from "@/graphql/types";

import { Button } from "./ui/button";

export default function GameCard({
  game,
  isShared,
  onEdit,
  onUpdateRate,
  onDelete,
  onCardClick,
}: {
  game: Game;
  isShared?: boolean;
  onEdit?: (game: Game) => void;
  onUpdateRate?: ({ id, rate }: { id: string; rate: number }) => void;
  onDelete?: (id: string) => void;
  onCardClick?: (id: string) => void;
}) {
  const { id, name, description, image, rating } = game;

  const setRateValue = async (newRating: number) => {
    if (typeof onUpdateRate == "function") {
      await onUpdateRate({ id, rate: newRating });
    }
  };

  const handleCardClick = () => {
    if (typeof onCardClick == "function") {
      onCardClick(id);
    }
  };

  const onDeleteHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    if (typeof onDelete == "function") {
      await onDelete(id);
    }
  };

  const onEditHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    game: Game
  ) => {
    e.stopPropagation();
    if (typeof onEdit == "function") {
      onEdit(game);
    }
  };

  return (
    <>
      <Card
        className="flex flex-col hover:shadow-lg cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader>
          <CardTitle className="truncate">{name}</CardTitle>
          <CardDescription className="h-10 line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex justify-center items-center">
          <img
            src={image || "./images/fallback.jpg"}
            height={304}
            width={304}
            alt={name}
            className="rounded-md object-cover"
          />
        </CardContent>

        <CardFooter className="flex flex-col justify-between items-start gap-3 w-full">
          <GameRating rating={rating || 0} onRate={setRateValue} />

          {!isShared ? (
            <div className="flex gap-2 w-full">
              <Button
                className="flex-1"
                variant="secondary"
                onClick={(e) => {
                  onEditHandler(e, game);
                }}
              >
                Edit
              </Button>

              <Button
                className="flex-1"
                onClick={(e) => {
                  onDeleteHandler(e, id);
                }}
                variant="destructive"
              >
                Remove
              </Button>
            </div>
          ) : null}
        </CardFooter>
      </Card>
    </>
  );
}
