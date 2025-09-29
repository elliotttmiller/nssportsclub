"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, User } from "lucide-react";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "default" | "ghost";
}

const Button = ({ children, variant = "default", ...props }: ButtonProps) => {
	const baseStyle =
		"px-3 py-1.5 rounded-md text-sm font-medium transition-colors";
	const variantStyle =
		variant === "default"
			? "bg-primary text-primary-foreground"
			: "hover:bg-muted";
	return (
		<button className={`${baseStyle} ${variantStyle}`} {...props}>
			{children}
		</button>
	);
};

export const Header = () => {
	const pathname = usePathname();

	return (
		<header className="h-16 border-b border-border bg-background/95 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-50">
			{/* Desktop Left Section */}
			<div className="hidden md:flex items-center space-x-3">
				<Link
					href="/"
					className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
				>
					<Trophy size={24} className="text-accent" />
					<h1 className="text-xl font-bold text-foreground">NSSPORTSCLUB</h1>
				</Link>
			</div>

			{/* Mobile Centered Logo */}
			<div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<Link
					href="/"
					className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
				>
					<Trophy size={22} className="text-accent" />
				</Link>
			</div>

			{/* Desktop Navigation */}
			<div className="hidden md:flex items-center space-x-2">
				<Link href="/">
					<Button variant={pathname === "/" ? "default" : "ghost"} aria-label="Home">
						Home
					</Button>
				</Link>
				<Link href="/games">
					<Button variant={pathname === "/games" ? "default" : "ghost"} aria-label="Games">
						Games
					</Button>
				</Link>
				<Link href="/my-bets">
					<Button variant={pathname === "/my-bets" ? "default" : "ghost"} aria-label="My Bets">
						My Bets
					</Button>
				</Link>
			</div>

			{/* Desktop Account Section */}
			<div className="flex items-center">
				<Link href="/account" className="flex items-center gap-2">
					<Button variant="ghost" aria-label="Account">
						<User size={16} />
						<span className="hidden md:inline">Account</span>
					</Button>
				</Link>
			</div>
		</header>
	);
};
