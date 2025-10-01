
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, User } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";


	export function Header() {
		const pathname = usePathname();
		return (
			<header className="w-full h-20 px-8 py-4 flex items-center justify-between bg-[#101215] shadow-md border-b border-border/10 rounded-b-xl relative">
				{/* Left Section */}
				<div className="flex items-center gap-3">
					<Link
						href="/"
						className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
					>
						<Trophy size={28} weight="fill" className="text-accent" />
						<span className="font-bold text-xl text-white tracking-wide">
							NSSPORTSCLUB
						</span>
					</Link>
				</div>

				{/* Mobile Centered Logo */}
				<div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
					<Link
						href="/"
						className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
					>
						<Trophy size={24} weight="fill" className="text-accent" />
						<h1 className="text-xl font-bold text-foreground tracking-tight">
							NSSPORTSCLUB
						</h1>
					</Link>
				</div>

				{/* Navigation Tabs */}
				<div className="hidden md:flex items-center space-x-0">
					<nav className="flex items-center gap-0 bg-background rounded-xl overflow-hidden border border-border">
						<Link
							href="/"
							className={`px-8 py-3 text-lg font-semibold transition-colors ${
								pathname === "/"
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground hover:bg-muted/40"
							}`}
						>
							Home
						</Link>
						<Link
							href="/games"
							className={`px-8 py-3 text-lg font-semibold transition-colors ${
								pathname === "/games"
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground hover:bg-muted/40"
							}`}
						>
							Games
						</Link>
						<Link
							href="/my-bets"
							className={`px-8 py-3 text-lg font-semibold transition-colors ${
								pathname === "/my-bets"
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground hover:bg-muted/40"
							}`}
						>
							My Bets
						</Link>
						<Link
							href="/account"
							className={`px-8 py-3 text-lg font-semibold flex items-center transition-colors ${
								pathname === "/account"
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground hover:bg-muted/40"
							}`}
						>
							<User size={18} className="mr-2" />
							Account
						</Link>
					</nav>
				</div>

				{/* Mobile Account Icon - Top Right */}
				<div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex items-center">
					<Button
						variant="ghost"
						size="sm"
						asChild
						className="h-8 w-8 p-0"
					>
						<Link href="/account">
							<User
								size={18}
								className="text-muted-foreground hover:text-foreground transition-colors"
							/>
						</Link>
					</Button>
				</div>

				{/* Desktop account section spacer for alignment */}
				<div className="hidden md:block w-[120px]"></div>
			</header>
		);
	}
