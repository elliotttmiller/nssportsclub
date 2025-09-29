import { useState, memo } from "react";
import { motion } from "framer-motion";
import {
  getTeam,
  getLeagueFromLeagueId,
  getLogoUrl,
  type TeamLogoConfig,
} from "@/lib/teamLogos";
import { cn } from "@/lib/utils";
import styles from "./TeamLogo.module.css";

interface TeamLogoProps {
  team: string | TeamLogoConfig;
  league?: "nfl" | "nba" | string; // Allow string for leagueId
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "default" | "circle" | "square" | "minimal";
  showName?: boolean;
  showAbbreviation?: boolean;
  className?: string;
  animate?: boolean;
}

const sizeMap = {
  xs: "w-4 h-4 min-w-[16px] min-h-[16px] max-w-[16px] max-h-[16px]",
  sm: "w-8 h-8 min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px]",
  md: "w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px]",
  lg: "w-16 h-16 min-w-[64px] min-h-[64px] max-w-[64px] max-h-[64px]",
  xl: "w-20 h-20 min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px]",
  "2xl": "w-24 h-24 min-w-[96px] min-h-[96px] max-w-[96px] max-h-[96px]",
};

export const TeamLogo = memo(function TeamLogo({
  team,
  league,
  size = "md",
  variant = "default",
  showName = false,
  showAbbreviation = false,
  className,
  animate = false,
}: TeamLogoProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get team config with league-aware lookup
  const teamConfig =
    typeof team === "string"
      ? getTeam(
          team,
          league === "nfl" || league === "nba"
            ? league
            : getLeagueFromLeagueId(league || "") || undefined,
        )
      : team;

  if (!teamConfig || imageError) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted rounded-full border text-muted-foreground",
          sizeMap[size],
          className,
        )}
      >
        <span className="text-xs font-medium">?</span>
      </div>
    );
  }

  const logoUrl = getLogoUrl(teamConfig, "svg");
  const showFallback = !logoUrl;

  const containerClasses = cn(
    "flex items-center justify-center relative overflow-hidden bg-white aspect-square",
    {
      "rounded-full": variant === "circle",
      "rounded-lg": variant === "square",
      rounded: variant === "default",
      "rounded-none": variant === "minimal",
    },
    sizeMap[size],
    className,
  );

  const LogoImage = () => (
    <motion.img
      src={logoUrl}
      alt={`${teamConfig.city} ${teamConfig.name} logo`}
      className={cn(
        "block m-auto object-contain max-w-full max-h-full w-full h-full",
        imageLoaded ? "opacity-100" : "opacity-0",
      )}
      onLoad={() => setImageLoaded(true)}
      onError={() => setImageError(true)}
      initial={animate ? { scale: 0.8, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: imageLoaded ? 1 : 0 } : false}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );

  // FallbackLogo removed: always show '?' icon if logo fails

  const LogoContainer = () => (
    <div className={containerClasses}>
      {/* Loading skeleton */}
      {!imageLoaded && showFallback === false && (
        <div
          className={cn("absolute inset-0 bg-muted animate-pulse", {
            "rounded-full": variant === "circle",
            "rounded-lg": variant === "square",
            rounded: variant === "default",
          })}
        />
      )}

      {showFallback ? (
        <span className="text-xs font-medium">?</span>
      ) : (
        <LogoImage />
      )}

      {/* Team color accent ring */}
      {variant !== "minimal" && (
        <div
          className={styles.accentRing + ' accent-ring'}
          data-primary-color={teamConfig.primaryColor}
        />
      )}
    </div>
  );

  // Just logo
  if (!showName && !showAbbreviation) {
    return <LogoContainer />;
  }

  // Logo with text
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={animate ? { x: -10, opacity: 0 } : false}
      animate={animate ? { x: 0, opacity: 1 } : false}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <LogoContainer />
      <div className="flex flex-col">
        {showName && (
          <span className="font-semibold text-foreground leading-tight">
            {size === "xs" || size === "sm"
              ? teamConfig.name
              : `${teamConfig.city} ${teamConfig.name}`}
          </span>
        )}
        {showAbbreviation && !showName && (
          <span className="font-bold text-foreground">
            {teamConfig.abbreviation}
          </span>
        )}
        {showAbbreviation && showName && (
          <span className="text-xs text-muted-foreground font-medium">
            {teamConfig.abbreviation}
          </span>
        )}
      </div>
    </motion.div>
  );
});

// Specialized components for common use cases
export const TeamLogoSmall = memo((props: Omit<TeamLogoProps, "size">) => (
  <TeamLogo {...props} size="sm" />
));

export const TeamLogoLarge = memo((props: Omit<TeamLogoProps, "size">) => (
  <TeamLogo {...props} size="lg" />
));

export const TeamLogoWithName = memo(
  (props: Omit<TeamLogoProps, "showName">) => (
    <TeamLogo {...props} showName={true} />
  ),
);

export const TeamLogoCircle = memo((props: Omit<TeamLogoProps, "variant">) => (
  <TeamLogo {...props} variant="circle" />
));

// Add displayName to all memoized components
TeamLogo.displayName = "TeamLogo";
TeamLogoSmall.displayName = "TeamLogoSmall";
TeamLogoLarge.displayName = "TeamLogoLarge";
TeamLogoWithName.displayName = "TeamLogoWithName";
TeamLogoCircle.displayName = "TeamLogoCircle";

// Team matchup component for displaying two teams
interface TeamMatchupProps {
  homeTeam: string | TeamLogoConfig;
  awayTeam: string | TeamLogoConfig;
  league?: "nfl" | "nba" | string;
  size?: TeamLogoProps["size"];
  showNames?: boolean;
  showVs?: boolean;
  className?: string;
  animate?: boolean;
  layout?: "horizontal" | "vertical";
}

export const TeamMatchup = memo(function TeamMatchup({
  homeTeam,
  awayTeam,
  league,
  size = "md",
  showNames = false,
  showVs = true,
  className,
  animate = false,
  layout = "horizontal",
}: TeamMatchupProps) {
  const containerClasses = cn(
    "flex items-center gap-3",
    layout === "vertical" && "flex-col gap-2",
    className,
  );

  return (
    <motion.div
      className={containerClasses}
      initial={animate ? { scale: 0.9, opacity: 0 } : false}
      animate={animate ? { scale: 1, opacity: 1 } : false}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <TeamLogo
        team={awayTeam}
        league={league}
        size={size}
        showName={showNames}
        animate={animate}
      />

      {showVs && (
        <motion.div
          className={cn(
            "text-muted-foreground font-medium",
            layout === "vertical" ? "text-xs" : "text-sm",
          )}
          initial={animate ? { opacity: 0 } : false}
          animate={animate ? { opacity: 1 } : false}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {layout === "vertical" ? "vs" : "@"}
        </motion.div>
      )}

      <TeamLogo
        team={homeTeam}
        league={league}
        size={size}
        showName={showNames}
        animate={animate}
      />
    </motion.div>
  );
});

export default TeamLogo;
