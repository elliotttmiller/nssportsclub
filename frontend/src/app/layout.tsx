import './globals.css';
import { Header } from '@/components/Header';
import { SideNavPanel } from '@/components/panels/SideNavPanel';
import { ActionHubPanel } from '@/components/panels/ActionHubPanel';
import { BetSlipProvider } from '@/context/BetSlipContext';
import { NavigationProvider } from '@/context/NavigationContext';
import WorkspacePanel from '@/components/panels/WorkspacePanel';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <BetSlipProvider>
          <NavigationProvider>
            <div className="flex h-screen flex-col bg-background text-foreground">
              <Header />
              <div className="grid flex-1 grid-cols-[240px_1fr_350px] overflow-hidden">
                <SideNavPanel />
                <main className="overflow-y-auto p-6">
                  <WorkspacePanel />
                </main>
                <ActionHubPanel />
              </div>
            </div>
          </NavigationProvider>
        </BetSlipProvider>
      </body>
    </html>
  );
}