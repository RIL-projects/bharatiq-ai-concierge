export const priya = {
  name: "Priya",
  fullName: "Priya Sharma",
  age: 31,
  location: "Powai, Mumbai",
  familySize: 3,
  monthsOnPlatform: 8,
  totalOrders: 47,
  dineInReservations: 12,
  monthlyBudget: 10000,
  spentThisMonth: 8200,
  savedThisMonth: 1100,
};

export const tasteDNA = {
  cuisines: [
    { name: "Southeast Asian", score: 85, orders: 18, color: "hsl(var(--primary))" },
    { name: "North Indian", score: 72, orders: 14, color: "hsl(var(--coral))" },
    { name: "Continental", score: 55, orders: 8, color: "hsl(var(--intelligence))" },
    { name: "Street Food", score: 40, orders: 5, color: "hsl(var(--success))" },
    { name: "South Indian", score: 35, orders: 3, color: "hsl(168 85% 50%)" },
    { name: "Chinese", score: 30, orders: 2, color: "hsl(30 80% 55%)" },
  ],
  spiceTolerance: 6,
  sweetTooth: 3,
  adventurousness: 8,
  proteins: ["Paneer", "Chicken", "Prawns"],
};

export const diningPatterns = [
  { label: "Weekday Lunch", budget: "₹200-300", party: "Solo/2", time: "12:30 PM", mode: "Delivery", icon: "☀️" },
  { label: "Weekend Friends", budget: "₹800-1200pp", party: "4-6 people", time: "Fri/Sat 8 PM", mode: "Dine-in", icon: "🍻" },
  { label: "Family Dinner", budget: "₹2,000-3,000", party: "3-4 people", time: "Sat 7:30 PM", mode: "Dine-in", icon: "👨‍👩‍👧" },
  { label: "Special Occasion", budget: "₹5,000+", party: "2 people", time: "Reservation", mode: "Fine dining", icon: "✨" },
];

export const restaurants = [
  {
    id: "ravis",
    name: "Ravi's Kitchen",
    cuisine: "North Indian",
    location: "Powai",
    distance: "1.2km",
    matchScore: 96,
    priceRange: "₹1,600-2,100",
    forFour: true,
    whyPicked: "Your family loved paneer dishes last time. Their Family Thali (₹395) is the best value in Powai — feeds 2 adults easily. Total for 4 with drinks: ~₹1,800",
    trending: "23 new families discovered this via BharatIQ this week",
    matchBreakdown: { budget: true, kidFriendly: true, cuisine: true, distance: true, available: true },
    heroNote: "Based on your past orders, you'll especially enjoy their Paneer Butter Masala (top-rated) and Family Thali (best value). Skip the Mushroom Do Pyaza — it's their weakest dish.",
    suggestedOrder: [
      { item: "Family Thali", price: 395, note: "feeds 2" },
      { item: "Butter Chicken", price: 325 },
      { item: "Dal Makhani", price: 245 },
      { item: "Naan (2)", price: 80 },
      { item: "Sweet Lassi (2)", price: 120 },
      { item: "Gulab Jamun", price: 95 },
    ],
    suggestedTotal: 1860,
    reviews: {
      families: "Spacious seating, staff is patient with kids, thali portions are generous",
      couples: "Good for date night — corner tables are quiet",
      regulars: "Paneer is the best in Powai. Consistent quality.",
      bharatiq: "This restaurant has improved 15% in repeat customer rate since joining NAM. More consistent food quality.",
    },
    saturdayAvail: "Open, moderate crowd 7-8 PM",
    deliveryTime: 28,
    deliveryFee: 30,
    capacity: 60,
    parking: true,
    kidChairs: true,
    image: "🍛",
  },
  {
    id: "punjab-grill",
    name: "Punjab Grill",
    cuisine: "Premium North Indian",
    location: "Powai",
    distance: "2.1km",
    matchScore: 89,
    priceRange: "₹2,200-2,500",
    forFour: true,
    whyPicked: "Excellent kid-friendly setup with dedicated kids' menu. Saturday special: 15% off for families of 4+. Known for butter chicken — Priya, you rated butter chicken 4.5★ at other places.",
    matchBreakdown: { budget: true, kidFriendly: true, cuisine: true, distance: true, available: true },
    image: "🥘",
  },
  {
    id: "bombay-canteen",
    name: "Bombay Canteen",
    cuisine: "Modern Indian",
    location: "Powai",
    distance: "1.8km",
    matchScore: 82,
    priceRange: "₹2,000-2,400",
    forFour: true,
    whyPicked: "Vibrant ambiance, great for families. Tasting portions let everyone try multiple dishes. Saturday has live music.",
    honestNote: "Drinks could take you slightly over ₹2,500 — I'd suggest their mocktail menu to stay in budget.",
    matchBreakdown: { budget: true, kidFriendly: true, cuisine: true, distance: true, available: true },
    image: "🍽️",
  },
  {
    id: "mamagoto",
    name: "Mamagoto",
    cuisine: "Pan-Asian",
    location: "Powai",
    distance: "0.9km",
    matchScore: 78,
    priceRange: "₹1,800-2,300",
    forFour: true,
    whyPicked: "Your Taste DNA shows 85% Southeast Asian affinity. They have a great kids' menu and Saturday happy hour. A different choice from your usual North Indian family dinners.",
    matchBreakdown: { budget: true, kidFriendly: true, cuisine: false, distance: true, available: true },
    image: "🥢",
  },
];

export const weekAhead = [
  { day: "Saturday", note: "Family dinner — I have 3 options ready based on last month's preferences", icon: "👨‍👩‍👧" },
  { day: "Sunday", note: "Your usual brunch spot (Suzette) has a new menu", icon: "🥐" },
  { day: "Tuesday", note: "Office lunch group — last time you wanted to try Korean, shall I find options?", icon: "🍱" },
];

export const recentPlaces = [
  { name: "Mamagoto", cuisine: "Pan-Asian", rating: "4.5★", lastVisit: "2 days ago" },
  { name: "Suzette", cuisine: "French Café", rating: "4.0★", lastVisit: "5 days ago" },
  { name: "Biergarten", cuisine: "Brewery", rating: "4.2★", lastVisit: "1 week ago" },
];

export const trendingNearYou = [
  { name: "Baan Thai", cuisine: "Thai", signal: "New opening, 0.8km away" },
  { name: "Seoul Kitchen", cuisine: "Korean BBQ", signal: "Gaining 40% more visitors this month" },
  { name: "The Bombay Salad Co.", cuisine: "Healthy", signal: "Top-rated new lunch spot in Powai" },
];

export const learningLog = [
  { date: "Mar 15", text: "You rated Thai curry at Mamagoto 5★ → Boosted Thai in your profile", icon: "⬆️" },
  { date: "Mar 10", text: "You searched 'Korean BBQ' 3 times → Added Korean as emerging interest", icon: "🆕" },
  { date: "Mar 5", text: "Family dinner at Punjab Grill — ordered North Indian → Confirmed family=North Indian pattern", icon: "✅" },
  { date: "Feb 28", text: "Skipped 2 dessert suggestions → Lowered sweet tooth score", icon: "⬇️" },
];

export const activeOrder = {
  restaurant: "Ravi's Kitchen",
  items: "Butter Chicken combo",
  status: "preparing" as const,
  estimatedTime: 18,
  stages: ["Order Received", "Kitchen Prep", "Out for Delivery", "Delivered"] as const,
};

export const upcomingReservation = {
  restaurant: "Ravi's Kitchen",
  date: "Saturday 7:30 PM",
  party: 4,
  status: "Confirmed",
};

export const proactiveIntel = [
  { text: "Your favorite Thai place (Mamagoto) launched a new weekend tasting menu — matches your profile.", type: "discovery" as const },
  { text: "Price alert: Punjab Grill is offering 20% off Saturday family dinners. Dinner for 4 ~₹1,900.", type: "deal" as const },
  { text: "New opening: 'Baan Thai' opened 0.8km from you — Southeast Asian, your top cuisine. Early reviews are promising.", type: "new" as const },
  { text: "Your friend Neha also liked a new brewery in Andheri. Worth checking for next friends' night.", type: "social" as const },
];

export const spendingData = {
  thisMonth: 8200,
  delivery: 6800,
  dineIn: 1400,
  trend: -12,
  savings: 1100,
  budget: 10000,
  remaining: 1800,
};

export const reorderHistory = [
  { restaurant: "Ravi's Kitchen", item: "Butter Chicken Combo", price: 450 },
  { restaurant: "Mamagoto", item: "Pad Thai + Dim Sum", price: 680 },
  { restaurant: "Suzette", item: "Mushroom Crepe + Coffee", price: 520 },
];

export const intentDimensions = [
  { label: "Intent", value: "Family dinner", icon: "🎯" },
  { label: "Party size", value: "4 people", icon: "👥" },
  { label: "When", value: "Saturday evening", icon: "📅" },
  { label: "Budget", value: "₹2,500 total (incl. drinks)", icon: "💰" },
  { label: "Implicit", value: "Kid-friendly (4-year-old)", icon: "👶" },
  { label: "Location", value: "Near Hiranandani, Powai", icon: "📍" },
  { label: "Cuisine pref", value: "North Indian (family pattern)", icon: "🍽️" },
  { label: "Seating", value: "Spacious (family preference)", icon: "💺" },
];

export const behindTheScenesStages = [
  { label: "Query Received", detail: "Natural language input parsed" },
  { label: "Intent Extraction", detail: "8 dimensions identified" },
  { label: "Profile Loaded", detail: "Priya's Taste DNA + history" },
  { label: "Restaurant Matching", detail: "47 restaurants scanned" },
  { label: "Personalization", detail: "Filtered to top 4 matches" },
  { label: "Budget Estimation", detail: "Per-restaurant cost calculated" },
  { label: "Results Delivered", detail: "Ranked by match score" },
];
