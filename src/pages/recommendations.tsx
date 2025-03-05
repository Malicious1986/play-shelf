import { useGetAiRecommendationsQuery } from "@/graphql/types";

export default function RecommendedGamesAI() {
  const { loading, error, data } = useGetAiRecommendationsQuery();

  if (loading) return <p>Loading AI recommendations...</p>;
  if (error) return <p>Error fetching AI recommendations.</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">AI-Powered Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.recommendedGamesAI.map((game:any, index: number) => (
          <div key={index} className="border p-4 rounded-lg">
            <h3 className="font-bold">{game.name}</h3>
            <p>{game.description}</p>
            <span className="text-gray-500 text-sm">{game.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
