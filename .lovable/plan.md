

# BharatIQ Consumer Agent — Implementation Plan

## Layout
Desktop "App Preview" layout with centered phone frame (430px) on the left and a "Behind the Scenes" intelligence panel on the right, exactly as specified.

## 5 Screens (Bottom Tab Navigation)

### Screen 1: Home — Conversational Hub
- Personalized greeting with time-aware context ("Good evening, Priya")
- Location bar (Powai, Mumbai) with context chips (Friday Evening, Family time, Weather)
- Hero chat interface with BharatIQ's smart opening message based on Priya's history
- Quick-action pills: "Family dinner Saturday", "Quick lunch tomorrow", "Date night", "Order from last place"
- "Your Week Ahead" auto-generated planner cards
- Recent places row + Taste DNA mini-card + Trending near you

### Screen 2: Discovery Conversation — The Magic Moment
- Pre-scripted conversation flow: Priya types the family dinner query
- Animated intent parsing visualization showing extracted dimensions lighting up
- 4 curated restaurant result cards with match scores, personalized "Why BharatIQ picked this", budget estimates, and action buttons
- Expandable comparison table
- Proactive follow-up suggestions from BharatIQ

### Screen 3: Restaurant Deep Dive
- Hero image + personalized BharatIQ note about what to order/skip
- Match score breakdown ring chart
- Smart curated order suggestion for family of 4 with budget calculation
- Sentiment-based reviews (families say / couples say / regulars say)
- Practical details: availability, delivery time, capacity, parking

### Screen 4: Taste DNA
- Animated radar chart showing cuisine affinities (SE Asian 85%, North Indian 72%, etc.)
- Dining pattern cards (weekday lunch, weekend friends, family dinner, special occasion)
- Flavor preferences (spice tolerance, proteins, adventurousness)
- Learning log feed showing recent profile updates
- Privacy controls with toggles

### Screen 5: Active Orders & Agent Activity
- Simulated live order tracking with auto-progressing status stages
- Upcoming reservation card
- Proactive intelligence feed (new suggestions appear every 15s)
- Spending intelligence dashboard with monthly stats and savings
- Quick reorder actions

## Interactive Elements
- Typing animation in chat with staggered card reveals
- Intent parsing animation with dimension highlights synced to the "Behind the Scenes" panel
- Taste DNA radar chart animates on load
- Order tracking auto-progresses through stages
- Behind the Scenes panel updates contextually based on active screen and interactions

## Design System
- Warm light mode (#FAFAFA background, cream accents)
- Deep teal (#0D9488) primary, coral (#F97316) deals, green (#10B981) confirmations, purple (#8B5CF6) intelligence
- BharatIQ avatar with subtle pulse animation
- Soft rounded cards, fluid transitions, Inter font
- Bottom tab bar with notification dots

## Data
All hardcoded with realistic Powai, Mumbai restaurant data, pricing in ₹, and Priya's 8-month usage history baked in.

