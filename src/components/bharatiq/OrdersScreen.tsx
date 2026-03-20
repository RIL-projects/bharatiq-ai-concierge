import { useState, useEffect } from "react";
import { activeOrder, upcomingReservation, proactiveIntel, spendingData, reorderHistory } from "@/data/bharatiq-data";
import BharatIQAvatar from "./BharatIQAvatar";
import { MapPin, Clock, Edit2, X, TrendingDown } from "lucide-react";

const OrdersScreen = () => {
  const stages = activeOrder.stages;
  const [currentStage, setCurrentStage] = useState(0);
  const [visibleAlerts, setVisibleAlerts] = useState(1);

  // Auto-progress order
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((s) => (s < stages.length - 1 ? s + 1 : s));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Proactive intel feed
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleAlerts((v) => Math.min(v + 1, proactiveIntel.length));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const stagePercent = ((currentStage + 1) / stages.length) * 100;

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-bold text-foreground">Orders & Activity</h2>
      </div>

      {/* Active Order */}
      <div className="px-4 pb-3">
        <div className="bg-card rounded-xl border border-border p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-foreground">🍛 {activeOrder.items}</p>
            <span className="text-[10px] text-muted-foreground">{activeOrder.restaurant}</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-secondary rounded-full mb-2 overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${stagePercent}%` }}
            />
          </div>
          <div className="flex justify-between">
            {stages.map((stage, i) => (
              <div key={stage} className="flex flex-col items-center">
                <div className={`h-3 w-3 rounded-full border-2 ${
                  i <= currentStage ? "bg-success border-success" : "bg-card border-border"
                } transition-colors`} />
                <span className={`text-[8px] mt-1 text-center max-w-[60px] ${
                  i <= currentStage ? "text-success font-medium" : "text-muted-foreground"
                }`}>{stage}</span>
              </div>
            ))}
          </div>
          {currentStage < stages.length - 1 && (
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              Est. {activeOrder.estimatedTime - currentStage * 5} min remaining
            </div>
          )}
          {currentStage === stages.length - 1 && (
            <p className="text-xs text-success font-medium mt-2">✓ Delivered! Enjoy your meal 🎉</p>
          )}
        </div>
      </div>

      {/* Reservation */}
      <div className="px-4 pb-3">
        <div className="bg-card rounded-xl border border-primary/20 p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">{upcomingReservation.restaurant}</p>
              <p className="text-[10px] text-muted-foreground">
                {upcomingReservation.date} · Party of {upcomingReservation.party}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-[10px] font-medium">
              {upcomingReservation.status}
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="px-3 py-1.5 rounded-lg border border-border text-[10px] text-muted-foreground flex items-center gap-1">
              <Edit2 className="h-3 w-3" /> Modify
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-destructive/20 text-[10px] text-destructive flex items-center gap-1">
              <X className="h-3 w-3" /> Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Proactive Intelligence */}
      <div className="px-4 pb-3">
        <h3 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
          <BharatIQAvatar size="sm" />
          <span>Working For You</span>
        </h3>
        <div className="space-y-2">
          {proactiveIntel.slice(0, visibleAlerts).map((intel, i) => {
            const colors = { discovery: "border-primary/20 bg-primary/5", deal: "border-coral/20 bg-coral/5", new: "border-success/20 bg-success/5", social: "border-intelligence/20 bg-intelligence/5" };
            const icons = { discovery: "🍽️", deal: "💰", new: "🆕", social: "👥" };
            return (
              <div key={i} className={`rounded-xl border p-3 ${colors[intel.type]} animate-fade-in`}>
                <p className="text-xs text-foreground">
                  <span className="mr-1">{icons[intel.type]}</span>
                  {intel.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spending Intelligence */}
      <div className="px-4 pb-3">
        <h3 className="text-xs font-semibold text-foreground mb-2">Spending This Month</h3>
        <div className="bg-card rounded-xl border border-border p-3 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Total</span>
            <span className="font-bold text-foreground">₹{spendingData.thisMonth.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">Delivery ₹{spendingData.delivery.toLocaleString()} · Dine-in ₹{spendingData.dineIn.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-success">
            <TrendingDown className="h-3 w-3" />
            Down {Math.abs(spendingData.trend)}% from last month
          </div>
          <div className="flex items-center gap-1 text-[10px] text-coral">
            💰 BharatIQ saved you ₹{spendingData.savings.toLocaleString()} via promotions
          </div>
          {/* Budget bar */}
          <div>
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>Budget: ₹{spendingData.budget.toLocaleString()}/mo</span>
              <span>₹{spendingData.remaining.toLocaleString()} left</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${((spendingData.budget - spendingData.remaining) / spendingData.budget) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reorder */}
      <div className="px-4 pb-6">
        <h3 className="text-xs font-semibold text-foreground mb-2">Quick Reorder</h3>
        <div className="space-y-2">
          {reorderHistory.map((order) => (
            <div key={order.item} className="flex items-center justify-between bg-card rounded-xl border border-border p-3">
              <div>
                <p className="text-xs font-medium text-foreground">{order.item}</p>
                <p className="text-[10px] text-muted-foreground">{order.restaurant} · ₹{order.price}</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-[10px] font-medium">
                Reorder
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersScreen;
