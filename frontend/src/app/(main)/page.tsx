import { ProfessionalGameRow } from '@/components/ProfessionalGameRow';
import { CompactMobileGameRow } from '@/components/CompactMobileGameRow';
import { mockGames } from '@/lib/mock-data';
import { Game } from '@/types';

export default function HomePage() {
  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto px-2 md:px-8 lg:px-12">
      {/* NFL Games Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">NFL Games</h2>
          <p className="text-muted-foreground">Upcoming matches for the week.</p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50">
          <div className="block md:hidden">
            {mockGames
              .filter((game: Game) => game.leagueId === 'nfl')
              .map((game: Game, idx: number) => (
                <CompactMobileGameRow key={game.id} game={game} index={idx} />
              ))}
          </div>
          <div className="hidden md:block">
            {mockGames
              .filter((game: Game) => game.leagueId === 'nfl')
              .map((game: Game) => (
                <ProfessionalGameRow key={game.id} game={game} />
              ))}
          </div>
        </div>
      </section>
      {/* NBA Games Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">NBA Games</h2>
          <p className="text-muted-foreground">Upcoming matches for the week.</p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/50">
          <div className="block md:hidden">
            {mockGames
              .filter((game: Game) => game.leagueId === 'nba')
              .map((game: Game, idx: number) => (
                <CompactMobileGameRow key={game.id} game={game} index={idx} />
              ))}
          </div>
          <div className="hidden md:block">
            {mockGames
              .filter((game: Game) => game.leagueId === 'nba')
              .map((game: Game) => (
                <ProfessionalGameRow key={game.id} game={game} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
