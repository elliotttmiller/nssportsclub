import { mockGames } from '@/lib/mock-data';
import { GameCard } from '@/components/GameCard';

export default function HomePage() {
  return (
    <div className="flex h-full w-full">
      {/* Left Panel: rendered by layout */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Center Panel: Trending/Live Games */}
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Trending Live Games</h2>
          <div className="space-y-4">
            {mockGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
      {/* Right Panel: rendered by layout */}
    </div>
  );
}
