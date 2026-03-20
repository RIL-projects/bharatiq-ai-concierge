import { MapPin, Cloud } from "lucide-react";
import BharatIQAvatar from "./BharatIQAvatar";
import { priya, weekAhead, recentPlaces, trendingNearYou, tasteDNA } from "@/data/bharatiq-data";

interface HomeScreenProps {
  onNavigate: (tab: string, payload?: any) => void;
}

const quickActions = [
  "Family dinner Saturday",
  "Quick lunch tomorrow",
  "Date night this weekend",
  "Order from last place",
];

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      {/* Greeting & Context */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-foreground">Good evening, {priya.name} 👋</h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin className="h-3 w-3" />
              <span>{priya.location}</span>
            </div>
          </div>
          <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-foreground">
            PS
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Friday Evening", "Family time", "26°C Pleasant"].map((chip) => (
            <span key={chip} className="px-2.5 py-1 rounded-full bg-secondary text-[11px] text-muted-foreground flex items-center gap-1">
              {chip === "26°C Pleasant" && <Cloud className="h-3 w-3" />}
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Chat Interface Hero */}
      <div className="px-4 pb-3">
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
          <div className="flex gap-2.5 mb-4">
            <BharatIQAvatar size="md" />
            <div className="flex-1 bg-secondary rounded-xl rounded-tl-sm p-3">
              <p className="text-sm text-foreground leading-relaxed">
                It's Friday evening! Last week you tried that new Thai place and loved it. Want me to find something similar, or are you feeling adventurous tonight? 🌶️
              </p>
              <p className="text-sm text-foreground leading-relaxed mt-2">
                I also noticed a new Southeast Asian restaurant opened near Hiranandani with great early reviews.
              </p>
            </div>
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 bg-secondary/50 rounded-xl px-3 py-2.5 border border-border cursor-pointer hover:border-primary/30 transition-colors"
            onClick={() => onNavigate("discover")}
          >
            <span className="text-sm text-muted-foreground flex-1">Tell me what you're in the mood for...</span>
            <span className="text-lg">🎤</span>
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {quickActions.map((action) => (
              <button
                key={action}
                onClick={() => onNavigate("discover")}
                className="px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs text-primary font-medium hover:bg-primary/10 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Week Ahead */}
      <div className="px-4 pb-3">
        <h2 className="text-sm font-semibold text-foreground mb-2">Your Week Ahead</h2>
        <div className="space-y-2">
          {weekAhead.map((item) => (
            <button
              key={item.day}
              onClick={() => onNavigate("discover")}
              className="w-full flex items-start gap-3 bg-card rounded-xl border border-border p-3 hover:border-primary/20 transition-colors text-left"
            >
              <span className="text-lg">{item.icon}</span>
              <div>
                <p className="text-xs font-semibold text-foreground">{item.day}</p>
                <p className="text-xs text-muted-foreground">{item.note}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Taste DNA Mini */}
      <div className="px-4 pb-3">
        <button
          onClick={() => onNavigate("tasteDNA")}
          className="w-full bg-intelligence/5 border border-intelligence/20 rounded-xl p-3 text-left hover:bg-intelligence/10 transition-colors"
        >
          <p className="text-xs font-semibold text-intelligence mb-2">Your Taste DNA</p>
          <div className="flex gap-3 flex-wrap">
            {tasteDNA.cuisines.slice(0, 4).map((c) => (
              <span key={c.name} className="text-[11px] text-foreground">
                {c.name} <span className="font-bold text-intelligence">{c.score}%</span>
              </span>
            ))}
          </div>
        </button>
      </div>

      {/* Recent */}
      <div className="px-4 pb-3">
        <h2 className="text-sm font-semibold text-foreground mb-2">Recent Places</h2>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {recentPlaces.map((p) => (
            <div key={p.name} className="min-w-[140px] bg-card rounded-xl border border-border p-3">
              <p className="text-xs font-semibold text-foreground">{p.name}</p>
              <p className="text-[10px] text-muted-foreground">{p.cuisine} · {p.rating}</p>
              <p className="text-[10px] text-muted-foreground">{p.lastVisit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="px-4 pb-6">
        <h2 className="text-sm font-semibold text-foreground mb-2">Trending Near You</h2>
        <div className="space-y-2">
          {trendingNearYou.map((t) => (
            <div key={t.name} className="flex items-center gap-3 bg-card rounded-xl border border-border p-3">
              <div className="h-8 w-8 rounded-full bg-coral/10 flex items-center justify-center text-coral text-xs font-bold">🔥</div>
              <div>
                <p className="text-xs font-semibold text-foreground">{t.name} · {t.cuisine}</p>
                <p className="text-[10px] text-muted-foreground">{t.signal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
