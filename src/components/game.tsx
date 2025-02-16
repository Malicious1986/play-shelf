import { Game } from "@/models/game";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GameRateItem from "./gameRateItem";
import { deleteGameAsync, updateGameRate } from "@/store/slices/gameSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { Button } from "./ui/button";

export default function GameCard({
  name,
  description,
  image,
  rating,
  id,
}: Game) {
  const dispatch = useDispatch<AppDispatch>();
  const setRateValue = async (rating: number) => {
    await dispatch(updateGameRate({ id, rating }));
  };
  const handleRemove = async () => {
    dispatch(deleteGameAsync(id));
  };
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="h-10 line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <img src={image}></img>
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
