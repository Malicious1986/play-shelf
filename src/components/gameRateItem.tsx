import { Star } from "lucide-react";

export default function GameRateItem({
  setRateValue,
  rateLevel,
  isActive,
}: {
  setRateValue: (value: number) => void;
  rateLevel: number;
  isActive?: boolean;
}) {
  const setRate = () => {
    setRateValue(isActive ? rateLevel : rateLevel + 1);
  };
  return (
    <Star
      key={rateLevel}
      onClick={setRate}
      className={isActive ? "text-yellow-400 fill-yellow-300" : ""}
    />
  );
}
