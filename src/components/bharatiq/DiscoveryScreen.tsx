import { useState, useEffect, useRef } from "react";
import BharatIQAvatar from "./BharatIQAvatar";
import { restaurants, intentDimensions } from "@/data/bharatiq-data";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface DiscoveryScreenProps {
  onSelectRestaurant: (id: string) => void;
  onProcessingChange?: (processing: boolean, step: number) => void;
}

const TypingIndicator = () => (
  <div className="flex gap-1 items-center px-3 py-2">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="h-2 w-2 rounded-full bg-primary/40 animate-typing-dot"
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
  </div>
);

const MatchBadge = ({ score }: { score: number }) => {
  const color = score >= 90 ? "bg-success text-success-foreground" : score >= 80 ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground";
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${color}`}>
      {score}% match
    </span>
  );
};

const RestaurantCard = ({ r, index, isTopPick, onSelect }: { r: typeof restaurants[0]; index: number; isTopPick: boolean; onSelect: () => void }) => {
  return (
    <div
      className={`bg-card rounded-xl border p-3 animate-slide-up ${isTopPick ? "border-primary/30 shadow-md" : "border-border"}`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {isTopPick && (
        <span className="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold mb-2">
          ⭐ Top Pick
        </span>
      )}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{r.image}</span>
          <div>
            <p className="text-sm font-semibold text-foreground">{r.name}</p>
            <p className="text-[10px] text-muted-foreground">{r.cuisine} · {r.location} · {r.distance}</p>
          </div>
        </div>
        <MatchBadge score={r.matchScore} />
      </div>
      <div className="bg-secondary/50 rounded-lg p-2 mb-2">
        <p className="text-xs text-foreground leading-relaxed">
          <span className="text-primary font-medium">Why: </span>{r.whyPicked}
        </p>
      </div>
      {r.honestNote && (
        <div className="bg-coral/5 border border-coral/20 rounded-lg p-2 mb-2">
          <p className="text-[11px] text-coral">💡 {r.honestNote}</p>
        </div>
      )}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground">Est. for 4: <span className="font-semibold text-foreground">{r.priceRange}</span></span>
        {r.trending && <span className="text-[10px] text-success">📈 {r.trending}</span>}
      </div>
      {/* Match breakdown */}
      <div className="flex gap-1 flex-wrap mb-3">
        {Object.entries(r.matchBreakdown).map(([key, val]) => (
          <span key={key} className={`px-1.5 py-0.5 rounded text-[9px] ${val ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>
            {val ? "✓" : "✗"} {key.replace(/([A-Z])/g, " $1").trim()}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={onSelect} className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
          View Details
        </button>
        <button className="px-3 py-2 rounded-lg border border-primary/20 text-primary text-xs font-medium hover:bg-primary/5 transition-colors">
          Reserve
        </button>
      </div>
    </div>
  );
};

const DiscoveryScreen = ({ onSelectRestaurant, onProcessingChange }: DiscoveryScreenProps) => {
  const [phase, setPhase] = useState<"idle" | "typing" | "parsing" | "results">("idle");
  const [step, setStep] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const query = "I want to take my family of four out for dinner this Saturday under ₹2,500 total including drinks — show me restaurants that fit this budget";

  const startFlow = () => {
    setPhase("typing");
    setTimeout(() => setPhase("parsing"), 1500);
  };

  useEffect(() => {
    if (phase === "parsing") {
      onProcessingChange?.(true, 0);
      const interval = setInterval(() => {
        setStep((s) => {
          const next = s + 1;
          onProcessingChange?.(true, next);
          if (next >= intentDimensions.length) {
            clearInterval(interval);
            setTimeout(() => {
              setPhase("results");
              onProcessingChange?.(false, 0);
            }, 800);
          }
          return next;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "results" && scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [phase]);

  return (
    <div ref={scrollRef} className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-bold text-foreground">Discovery</h2>
      </div>

      <div className="flex-1 px-4 pb-4 space-y-3">
        {/* Idle state */}
        {phase === "idle" && (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <BharatIQAvatar size="lg" />
            <p className="text-sm text-muted-foreground text-center max-w-[280px]">
              Tell me what you're looking for — I understand complex requests like budget, party size, vibe, and more.
            </p>
            <button
              onClick={startFlow}
              className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Try: "Family dinner Saturday under ₹2,500"
            </button>
          </div>
        )}

        {/* User message */}
        {phase !== "idle" && (
          <div className="flex justify-end animate-fade-in">
            <div className="bg-primary text-primary-foreground rounded-xl rounded-br-sm px-3 py-2 max-w-[85%]">
              <p className="text-sm">{query}</p>
            </div>
          </div>
        )}

        {/* Typing */}
        {phase === "typing" && (
          <div className="flex gap-2 items-end animate-fade-in">
            <BharatIQAvatar />
            <div className="bg-secondary rounded-xl rounded-tl-sm">
              <TypingIndicator />
            </div>
          </div>
        )}

        {/* Parsing */}
        {phase === "parsing" && (
          <div className="flex gap-2 items-start animate-fade-in">
            <BharatIQAvatar />
            <div className="flex-1 bg-secondary rounded-xl rounded-tl-sm p-3">
              <p className="text-xs font-semibold text-intelligence mb-2">🧠 Understanding your request...</p>
              <div className="space-y-1.5">
                {intentDimensions.map((dim, i) => (
                  <div
                    key={dim.label}
                    className={`flex items-center gap-2 transition-all duration-300 ${i <= step ? "opacity-100" : "opacity-0"}`}
                  >
                    <span className="text-xs">{dim.icon}</span>
                    <span className="text-xs text-muted-foreground">{dim.label}:</span>
                    <span className="text-xs font-medium text-foreground">{dim.value}</span>
                    <Check className="h-3 w-3 text-success ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {phase === "results" && (
          <>
            <div className="flex gap-2 items-start animate-fade-in">
              <BharatIQAvatar />
              <div className="flex-1 bg-secondary rounded-xl rounded-tl-sm p-3">
                <p className="text-sm text-foreground">
                  I found <span className="font-bold">4 places</span> that fit your Saturday family dinner under ₹2,500. Here's what I'd recommend based on your family's preferences:
                </p>
              </div>
            </div>

            {/* Restaurant cards */}
            <div className="space-y-3">
              {restaurants.map((r, i) => (
                <RestaurantCard
                  key={r.id}
                  r={r}
                  index={i}
                  isTopPick={i === 0}
                  onSelect={() => onSelectRestaurant(r.id)}
                />
              ))}
            </div>

            {/* Comparison toggle */}
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="w-full flex items-center justify-center gap-1 py-2 text-xs text-primary font-medium"
            >
              {showComparison ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {showComparison ? "Hide" : "Show"} Comparison
            </button>

            {showComparison && (
              <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="border-b border-border bg-secondary/50">
                      <th className="p-2 text-left text-muted-foreground">Restaurant</th>
                      <th className="p-2 text-center text-muted-foreground">Match</th>
                      <th className="p-2 text-center text-muted-foreground">Budget</th>
                      <th className="p-2 text-center text-muted-foreground">Dist.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurants.map((r) => (
                      <tr key={r.id} className="border-b border-border last:border-0">
                        <td className="p-2 font-medium text-foreground">{r.name}</td>
                        <td className="p-2 text-center font-bold text-primary">{r.matchScore}%</td>
                        <td className="p-2 text-center text-foreground">{r.priceRange}</td>
                        <td className="p-2 text-center text-muted-foreground">{r.distance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Follow-up */}
            <div className="flex gap-2 items-start animate-fade-in" style={{ animationDelay: "1s" }}>
              <BharatIQAvatar />
              <div className="flex-1 space-y-2">
                <div className="bg-secondary rounded-xl rounded-tl-sm p-3">
                  <p className="text-xs text-foreground">Anything else I can help with?</p>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {["Check Saturday availability", "Find a backup option", "Factor in husband's preferences"].map((s) => (
                    <button key={s} className="px-2.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] text-primary font-medium">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DiscoveryScreen;
