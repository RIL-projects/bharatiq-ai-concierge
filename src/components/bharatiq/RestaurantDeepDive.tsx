import { restaurants } from "@/data/bharatiq-data";
import BharatIQAvatar from "./BharatIQAvatar";
import { ArrowLeft, MapPin, Clock, Car, Baby, Check } from "lucide-react";

interface RestaurantDeepDiveProps {
  restaurantId: string;
  onBack: () => void;
}

const RestaurantDeepDive = ({ restaurantId, onBack }: RestaurantDeepDiveProps) => {
  const r = restaurants.find((r) => r.id === restaurantId) || restaurants[0];
  const hasFullData = r.id === "ravis";

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-4 pb-6">
        <button onClick={onBack} className="flex items-center gap-1 text-xs text-primary mb-3">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{r.image}</span>
          <div>
            <h2 className="text-lg font-bold text-foreground">{r.name}</h2>
            <p className="text-xs text-muted-foreground">{r.cuisine} · {r.location}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">{r.distance} away</span>
            </div>
          </div>
        </div>
        {/* Match score ring */}
        <div className="absolute top-4 right-4 flex flex-col items-center">
          <div className="relative h-14 w-14">
            <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--border))" strokeWidth="2.5" />
              <circle
                cx="18" cy="18" r="15.5" fill="none"
                stroke="hsl(var(--primary))" strokeWidth="2.5"
                strokeDasharray={`${r.matchScore} ${100 - r.matchScore}`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-primary">{r.matchScore}%</span>
          </div>
          <span className="text-[9px] text-muted-foreground mt-0.5">Match</span>
        </div>
      </div>

      <div className="px-4 space-y-4 pb-6">
        {/* BharatIQ Personal Note */}
        {hasFullData && (
          <div className="flex gap-2 items-start bg-primary/5 rounded-xl p-3 border border-primary/10 -mt-3">
            <BharatIQAvatar />
            <p className="text-xs text-foreground leading-relaxed">{r.heroNote}</p>
          </div>
        )}

        {/* Suggested Order */}
        {hasFullData && r.suggestedOrder && (
          <div className="bg-card rounded-xl border border-border p-3">
            <p className="text-xs font-semibold text-foreground mb-2">🍽️ Suggested Order for Family of 4</p>
            <div className="space-y-1.5">
              {r.suggestedOrder.map((item) => (
                <div key={item.item} className="flex justify-between text-xs">
                  <span className="text-foreground">
                    {item.item}
                    {item.note && <span className="text-muted-foreground ml-1">({item.note})</span>}
                  </span>
                  <span className="text-muted-foreground">₹{item.price}</span>
                </div>
              ))}
              <div className="border-t border-border pt-1.5 flex justify-between text-xs font-bold">
                <span className="text-foreground">Estimated Total</span>
                <span className="text-primary">₹{r.suggestedTotal}</span>
              </div>
              <p className="text-[10px] text-success">✓ Well within ₹2,500 budget with room for drinks</p>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium">Order This</button>
              <button className="px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground">Modify</button>
            </div>
          </div>
        )}

        {/* Sentiment Reviews */}
        {hasFullData && r.reviews && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-foreground">What People Say</p>
            {Object.entries(r.reviews).map(([key, val]) => {
              const labels: Record<string, string> = { families: "👨‍👩‍👧 Families", couples: "💑 Couples", regulars: "🔄 Regulars", bharatiq: "🧠 BharatIQ" };
              return (
                <div key={key} className="bg-secondary/50 rounded-lg p-2.5">
                  <p className="text-[10px] font-semibold text-muted-foreground mb-0.5">{labels[key]}</p>
                  <p className="text-xs text-foreground">{val}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Practical Details */}
        <div className="bg-card rounded-xl border border-border p-3 space-y-2">
          <p className="text-xs font-semibold text-foreground">Practical Details</p>
          {hasFullData && (
            <>
              <div className="flex items-center gap-2 text-xs text-foreground">
                <Clock className="h-3 w-3 text-muted-foreground" />
                Saturday: {r.saturdayAvail} (best to book)
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground">
                <span className="text-muted-foreground">🛵</span>
                Delivery: {r.deliveryTime} min · ₹{r.deliveryFee} fee
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground">
                <span className="text-muted-foreground">📊</span>
                Currently at {r.capacity}% capacity
              </div>
              {r.parking && (
                <div className="flex items-center gap-2 text-xs text-success">
                  <Car className="h-3 w-3" /> Parking available
                </div>
              )}
              {r.kidChairs && (
                <div className="flex items-center gap-2 text-xs text-success">
                  <Baby className="h-3 w-3" /> Kid chairs available
                </div>
              )}
            </>
          )}
          <button className="w-full py-2.5 rounded-lg bg-success text-success-foreground text-xs font-medium mt-2">
            Book for Sat 7:30 PM, 4 people
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDeepDive;
