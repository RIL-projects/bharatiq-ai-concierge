import { useState } from "react";
import BottomNav, { type Tab } from "./BottomNav";
import BehindTheScenes from "./BehindTheScenes";
import HomeScreen from "./HomeScreen";
import DiscoveryScreen from "./DiscoveryScreen";
import RestaurantDeepDive from "./RestaurantDeepDive";
import TasteDNAScreen from "./TasteDNAScreen";
import OrdersScreen from "./OrdersScreen";

const AppShell = () => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedRestaurant(null);
  };

  const handleNavigate = (target: string, payload?: any) => {
    if (target === "discover") setActiveTab("discover");
    if (target === "tasteDNA") setActiveTab("tasteDNA");
    if (target === "orders") setActiveTab("orders");
  };

  const handleSelectRestaurant = (id: string) => {
    setSelectedRestaurant(id);
  };

  const renderScreen = () => {
    if (selectedRestaurant) {
      return <RestaurantDeepDive restaurantId={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />;
    }
    switch (activeTab) {
      case "home": return <HomeScreen onNavigate={handleNavigate} />;
      case "discover": return (
        <DiscoveryScreen
          onSelectRestaurant={handleSelectRestaurant}
          onProcessingChange={(p, s) => { setIsProcessing(p); setProcessingStep(s); }}
        />
      );
      case "tasteDNA": return <TasteDNAScreen />;
      case "orders": return <OrdersScreen />;
      default: return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-foreground/5 p-4 gap-6">
      {/* Phone Frame */}
      <div className="w-[430px] h-[860px] bg-card rounded-[2.5rem] shadow-2xl border border-border overflow-hidden flex flex-col relative">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 py-2 text-[10px] text-muted-foreground bg-card">
          <span className="font-medium">7:12 PM</span>
          <div className="flex items-center gap-1">
            <span>📶</span>
            <span>🔋 85%</span>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>

        {/* Bottom nav */}
        <BottomNav
          active={activeTab}
          onTabChange={handleTabChange}
          notifications={{ discover: true, orders: true }}
        />
      </div>

      {/* Behind the Scenes Panel */}
      <div className="w-[380px] h-[860px] hidden lg:block">
        <BehindTheScenes
          activeTab={selectedRestaurant ? "discover" : activeTab}
          isProcessing={isProcessing}
          processingStep={processingStep}
        />
      </div>
    </div>
  );
};

export default AppShell;
