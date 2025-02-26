import { Dices } from "lucide-react";

export default function NoGames() {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <Dices className="w-32 h-32 text-gray-600" />
      <p className="text-3xl text-gray-600">No games added yet...</p>
    </div>
  );
}
