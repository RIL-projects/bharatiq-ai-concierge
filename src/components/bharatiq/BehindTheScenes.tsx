import { useState, useEffect } from "react";
import { behindTheScenesStages, intentDimensions } from "@/data/bharatiq-data";
import type { Tab } from "./BottomNav";
import { Check, Loader2 } from "lucide-react";

interface BehindTheScenesProps {
  activeTab: Tab;
  isProcessing?: boolean;
  processingStep?: number;
}

const contextByTab: Record<Tab, { title: string; items: { label: string; value: string }[] }> = {
  home: {
    title: "Context Awareness",
    items: [
      { label: "User", value: "Priya Sharma (8-month user)" },
      { label: "Time", value: "Friday Evening, 7:12 PM" },
      { label: "Location", value: "Hiranandani, Powai" },
      { label: "Weather", value: "26°C — Pleasant" },
      { label: "Pattern", value: "Usually explores dining Fri eve" },
      { label: "Last order", value: "Thai curry (Mamagoto) — 2d ago" },
    ],
  },
  discover: {
    title: "Intent Processing",
    items: [],
  },
  tasteDNA: {
    title: "Profile Intelligence",
    items: [
      { label: "Data points", value: "47 orders, 12 dine-ins analyzed" },
      { label: "Top cuisine", value: "Southeast Asian (85%)" },
      { label: "Confidence", value: "High (8 months of data)" },
      { label: "Emerging", value: "Korean (3 searches this week)" },
      { label: "Declining", value: "Street Food (−10% last month)" },
    ],
  },
  orders: {
    title: "Fulfilment Engine",
    items: [
      { label: "Active orders", value: "1 (Ravi's Kitchen)" },
      { label: "Kitchen status", value: "Prep stage (est. 18 min)" },
      { label: "Delivery ETA", value: "28 min from now" },
      { label: "Reservations", value: "1 upcoming (Saturday)" },
      { label: "Proactive alerts", value: "4 new suggestions queued" },
    ],
  },
  profile: {
    title: "User Settings",
    items: [
      { label: "Privacy", value: "Profile sharing: OFF" },
      { label: "Notifications", value: "Deals + New openings ON" },
      { label: "Budget tracking", value: "₹10K/month limit set" },
    ],
  },
};

const BehindTheScenes = ({ activeTab, isProcessing, processingStep = 0 }: BehindTheScenesProps) => {
  const ctx = contextByTab[activeTab];

  return (
    <div className="h-full flex flex-col bg-foreground/[0.03] rounded-2xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse-soft" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Behind the Scenes</span>
        </div>
        <h3 className="text-sm font-bold text-foreground">{ctx.title}</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {activeTab === "discover" && isProcessing ? (
          <>
            {/* Intent parsing visualization */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Intent Parsed</p>
              {intentDimensions.map((dim, i) => (
                <div
                  key={dim.label}
                  className={`flex items-start gap-2 p-2 rounded-lg transition-all duration-500 ${
                    i <= processingStep ? "bg-primary/10 opacity-100" : "opacity-30"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="text-sm">{dim.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-foreground">{dim.label}</p>
                    <p className="text-xs text-muted-foreground">{dim.value}</p>
                  </div>
                  {i <= processingStep && <Check className="h-3 w-3 text-success ml-auto mt-0.5" />}
                </div>
              ))}
            </div>

            {/* Pipeline stages */}
            <div className="space-y-2 mt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Agent Pipeline</p>
              {behindTheScenesStages.map((stage, i) => {
                const stageIdx = Math.floor(processingStep / 1.2);
                const isDone = i <= stageIdx;
                const isCurrent = i === stageIdx + 1;
                return (
                  <div key={stage.label} className="flex items-center gap-2">
                    {isDone ? (
                      <Check className="h-3.5 w-3.5 text-success" />
                    ) : isCurrent ? (
                      <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-full border border-border" />
                    )}
                    <div>
                      <p className={`text-xs font-medium ${isDone ? "text-foreground" : "text-muted-foreground"}`}>{stage.label}</p>
                      {(isDone || isCurrent) && <p className="text-[10px] text-muted-foreground">{stage.detail}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {ctx.items.map((item) => (
              <div key={item.label} className="flex justify-between items-start gap-2">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className="text-xs font-medium text-foreground text-right">{item.value}</span>
              </div>
            ))}

            {activeTab === "discover" && !isProcessing && (
              <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground">
                  Type a query in the chat to see BharatIQ's intent parsing engine in action.
                </p>
              </div>
            )}
          </>
        )}

        {/* Agents activated */}
        {activeTab === "discover" && isProcessing && processingStep > 3 && (
          <div className="space-y-2 mt-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Agents Activated</p>
            {["Demand Allocator", "Basket Clustering", "Diet Planner", "Price Optimizer"].map((agent, i) => (
              <div key={agent} className="flex items-center gap-2 text-xs animate-fade-in" style={{ animationDelay: `${i * 200}ms` }}>
                <div className="h-2 w-2 rounded-full bg-intelligence animate-pulse-soft" />
                <span className="text-foreground font-medium">{agent}</span>
              </div>
            ))}
            <div className="mt-2 text-[10px] text-muted-foreground">
              Shops matched: 47 → After personalization: 4
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BehindTheScenes;
