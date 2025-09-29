import { Header } from '@/components/Header';
import { SideNavPanel } from '@/components/panels/SideNavPanel';
import { ActionHubPanel } from '@/components/panels/ActionHubPanel';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Header />
      <div className="grid flex-1 grid-cols-[240px_1fr_350px] overflow-hidden">
        <SideNavPanel />
        <main className="overflow-y-auto p-6">{children}</main>
        <ActionHubPanel />
      </div>
    </div>
  );
}
