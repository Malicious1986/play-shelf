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

export default function GameCard({
  name,
  description,
  image,
  rating,
  id,
}: Game) {
  const [updateRate] = useMutation(UPDATE_GAME_RATE, {
    refetchQueries: [{ query: GET_GAMES }],
  });
  const [deleteGame] = useMutation(DELETE_GAME, {
    refetchQueries: [{ query: GET_GAMES }],
  });
  const setRateValue = async (rating: number) => {
    await updateRate({ variables: { id, rating } });
  };
  const handleRemove = async () => {
    await deleteGame({ variables: { id } });
  };
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="h-10 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex justify-center items-center">
        <img src={image} height={304} width={304}></img>
      </CardContent>
      <CardFooter className="flex flex-col justify-between items-start gap-3">
        <div className="flex justify-between">
          {Array.from({ length: 5 }).map((_, index) => (
            <GameRateItem
              key={index}
              rateLevel={index}
              isActive={index < rating}
              setRateValue={setRateValue}
            />
          ))}
        </div>

        <Button className="cursor-pointer" onClick={handleRemove} variant="outline">Remove</Button>
      </CardFooter>
    </Card>
  );
}
