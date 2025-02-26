import GameGrid from "@/components/grid";
import { AddGameDialog } from "@/components/addGameDialog";
import GameFilters from "@/components/gameFilters";
import { useMutation } from "@apollo/client";
import { GENERATE_SHARE_LINK } from "@/graphql/mutations";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export default function GameCollection() {
  const [generateShareLink] = useMutation(GENERATE_SHARE_LINK);
  
  const handleShare = async () => {
    try {
      const { data } = await generateShareLink();
      const shareUrl = data.generateShareLink;

      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied! Share with your friends.");
    } catch (error) {
      console.error("Failed to generate share link:", error);
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Games</h1>
      <div className="flex mb-6 gap-3">
        <GameFilters />
        <Button variant="outline" onClick={handleShare}>
          <Link /> <span className="md:inline hidden">Share</span>
        </Button>
        <AddGameDialog />
      </div>
      <GameGrid />
    </div>
  );
}
