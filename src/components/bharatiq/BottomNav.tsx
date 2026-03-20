import { useState } from "react";
import { Home, Search, Fingerprint, ShoppingBag, User } from "lucide-react";

type Tab = "home" | "discover" | "tasteDNA" | "orders" | "profile";

interface BottomNavProps {
  active: Tab;
  onTabChange: (tab: Tab) => void;
  notifications?: Partial<Record<Tab, boolean>>;
}

const tabs: { id: Tab; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "discover", label: "Discover", Icon: Search },
  { id: "tasteDNA", label: "Taste DNA", Icon: Fingerprint },
  { id: "orders", label: "Orders", Icon: ShoppingBag },
  { id: "profile", label: "Profile", Icon: User },
];

const BottomNav = ({ active, onTabChange, notifications = {} }: BottomNavProps) => {
  return (
    <nav className="flex items-center justify-around border-t border-border bg-card py-2 px-1">
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`relative flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors ${
              isActive ? "text-primary font-semibold" : "text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
            {notifications[id] && (
              <span className="absolute top-0 right-2 h-2 w-2 rounded-full bg-coral" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
export type { Tab };
