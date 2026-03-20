import { tasteDNA, diningPatterns, learningLog } from "@/data/bharatiq-data";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";

const TasteDNAScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Draw radar chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 260;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = 100;
    const cuisines = tasteDNA.cuisines;
    const n = cuisines.length;
    const angleStep = (Math.PI * 2) / n;

    // Grid
    ctx.strokeStyle = "hsl(30 15% 90%)";
    ctx.lineWidth = 0.5;
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      const r = (maxR / 4) * ring;
      for (let i = 0; i <= n; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Axis lines + labels
    ctx.fillStyle = "hsl(220 10% 46%)";
    ctx.font = "10px Inter, system-ui";
    ctx.textAlign = "center";
    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle));
      ctx.stroke();

      const lx = cx + (maxR + 18) * Math.cos(angle);
      const ly = cy + (maxR + 18) * Math.sin(angle);
      ctx.fillText(cuisines[i].name, lx, ly + 3);
    }

    // Data polygon
    const progress = animated ? 1 : 0;
    ctx.beginPath();
    ctx.fillStyle = "hsla(168, 85%, 32%, 0.15)";
    ctx.strokeStyle = "hsl(168, 85%, 32%)";
    ctx.lineWidth = 2;
    for (let i = 0; i <= n; i++) {
      const idx = i % n;
      const angle = idx * angleStep - Math.PI / 2;
      const r = (cuisines[idx].score / 100) * maxR * progress;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.fill();
    ctx.stroke();

    // Dots
    for (let i = 0; i < n; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const r = (cuisines[i].score / 100) * maxR * progress;
      ctx.beginPath();
      ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 4, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(168, 85%, 32%)";
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [animated]);

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-sm font-bold text-foreground">Your Taste DNA</h2>
        <p className="text-[11px] text-muted-foreground">Built from 47 orders over 8 months</p>
      </div>

      {/* Radar Chart */}
      <div className="flex justify-center py-2">
        <canvas ref={canvasRef} />
      </div>

      {/* Cuisine scores */}
      <div className="px-4 space-y-1.5 pb-4">
        {tasteDNA.cuisines.map((c) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className="text-xs text-foreground w-24">{c.name}</span>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: animated ? `${c.score}%` : "0%",
                  backgroundColor: c.color,
                }}
              />
            </div>
            <span className="text-xs font-bold text-foreground w-8 text-right">{c.score}%</span>
          </div>
        ))}
      </div>

      {/* Dining Patterns */}
      <div className="px-4 pb-4">
        <h3 className="text-xs font-semibold text-foreground mb-2">Dining Patterns</h3>
        <div className="grid grid-cols-2 gap-2">
          {diningPatterns.map((p) => (
            <div key={p.label} className="bg-card rounded-xl border border-border p-2.5">
              <span className="text-lg">{p.icon}</span>
              <p className="text-[11px] font-semibold text-foreground mt-1">{p.label}</p>
              <p className="text-[10px] text-muted-foreground">{p.budget}</p>
              <p className="text-[10px] text-muted-foreground">{p.party} · {p.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Flavor Prefs */}
      <div className="px-4 pb-4">
        <h3 className="text-xs font-semibold text-foreground mb-2">Flavor Preferences</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Spice tolerance</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`h-2.5 w-2.5 rounded-sm ${i < tasteDNA.spiceTolerance ? "bg-coral" : "bg-secondary"}`} />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Sweet tooth</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`h-2.5 w-2.5 rounded-sm ${i < tasteDNA.sweetTooth ? "bg-intelligence" : "bg-secondary"}`} />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Adventurousness</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`h-2.5 w-2.5 rounded-sm ${i < tasteDNA.adventurousness ? "bg-success" : "bg-secondary"}`} />
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">Preferred proteins</span>
            <span className="text-xs text-foreground">{tasteDNA.proteins.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Learning Log */}
      <div className="px-4 pb-4">
        <h3 className="text-xs font-semibold text-foreground mb-2">Learning Log</h3>
        <div className="space-y-2">
          {learningLog.map((log, i) => (
            <div key={i} className="flex items-start gap-2 bg-intelligence/5 rounded-lg p-2.5 border border-intelligence/10">
              <span className="text-sm">{log.icon}</span>
              <div>
                <p className="text-[10px] text-muted-foreground">{log.date}</p>
                <p className="text-xs text-foreground">{log.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="px-4 pb-6">
        <h3 className="text-xs font-semibold text-foreground mb-2">Privacy & Control</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground">Use taste profile for recommendations</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground">Share anonymized preferences</span>
            <Switch />
          </div>
          <p className="text-[10px] text-muted-foreground italic">
            Your data belongs to you. BharatIQ learns to serve you, not to sell you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TasteDNAScreen;
