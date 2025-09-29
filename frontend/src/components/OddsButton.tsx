import { Button } from "@/components/ui/button";

interface OddsButtonProps {
  team: string;
  odds: number;
  onClick: () => void;
  isSelected?: boolean;
}

export function OddsButton({
  team,
  odds,
  onClick,
  isSelected,
}: OddsButtonProps) {
  return (
    <Button
      data-slot="button"
      className="inline-flex items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none border border-[color:var(--color-border)]/20 bg-background/95 shadow-sm rounded-lg gap-2 px-5 h-10 text-base font-semibold text-foreground transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:border-accent/40 active:scale-95"
      variant={isSelected ? "default" : "outline"}
      onClick={onClick}
    >
      {team} {odds > 0 ? "+" : ""}
      {odds}
    </Button>
  );
}
