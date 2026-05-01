# 📐 QueNriX Homepage - Visual Architecture & Layout

## 🏗️ Overall Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                     HEADER / NAVIGATION BAR                     │
│  [Logo] [Tutorials] [Exercises] [About] [Contact] [Search] [Auth]│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    ✨ HERO SECTION (NEW) ✨                    │
│                                                                 │
│  ┌──────────────────────────┐  ┌──────────────────────────┐   │
│  │                          │  │    CODE EDITOR CARD      │   │
│  │   Build Skills.          │  │  ┌────────────────────┐  │   │
│  │   Get Hired.             │  │  │  ●●●  app.js       │  │   │
│  │   Start Your             │  │  │ ┌──────────────────┤  │   │
│  │   Tech Career.           │  │  │ │ function hello(){ │  │   │
│  │                          │  │  │ │   console.log...  │  │   │
│  │   [Subtext about         │  │  │ │ }                 │  │   │
│  │    learning &            │  │  │ └──────────────────┤  │   │
│  │    placements]           │  │  │ Output: Hello...   │  │   │
│  │                          │  │  └────────────────────┘  │   │
│  │  ┌─────────────────────┐│  │     🔴 Live Preview        │   │
│  │  │ Start Free Assess.  ││  └──────────────────────────┘   │
│  │  └─────────────────────┘│                                 │   │
│  │  ┌─────────────────────┐│                                 │   │
│  │  │  View Programs   →  ││                                 │   │
│  │  └─────────────────────┘│                                 │   │
│  │                          │                                 │   │
│  │  ★★★★★ 4.8/5           │                                 │   │
│  │  👥 10,000+ Learners    │                                 │   │
│  └──────────────────────────┘                                 │   │
│                                                                 │
│  [Floating decorative elements and gradient orbs]              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                   📊 STATS SECTION (NEW) 📊                     │
│                                                                 │
│     "Trusted by Thousands of Learners"                         │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌─────────┐│
│  │      ⭐      │ │      👥      │ │      🎯      │ │    🤝   ││
│  │   4.8 / 5    │ │  10,000+     │ │    350+      │ │   40+   ││
│  │  Student     │ │   Active     │ │  Placements  │ │ Hiring  ││
│  │   Rating     │ │   Learners   │ │              │ │Partners ││
│  │ Highly rated │ │Growing daily │ │Successful    │ │ Top     ││
│  │by learners   │ │              │ │jobs placed   │ │companies││
│  └──────────────┘ └──────────────┘ └──────────────┘ └─────────┘│
│                                                                 │
│  Ready to join our community?                                  │
│  ┌──────────────────────────────────┐                          │
│  │   Start Learning Today →          │                          │
│  └──────────────────────────────────┘                          │
│                                                                 │
│  [Background floating decoration]                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                  BATCHES / COURSES SECTION                      │
│                     (Existing Navbar)                           │
│                                                                 │
│   📅 Upcoming Batches | 📚 Study Notes | 🏆 Success Stories    │
│                                                                 │
│   [Real-time batch cards with enrollment info]                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         FOOTER SECTION                          │
│              [Links, Contact, Social, Copyright]               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Zones & Gradients

```
╔═══════════════════════════════════════════════════════════════╗
║                   HEADER (Dark background)                    ║
╚═══════════════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════════════╗
║  HERO SECTION (Light background with gradient orbs)          ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ Left: Text with purple gradient                         │ ║
║  │ [Text] [Purple→Blue Buttons] [Trust Badge]              │ ║
║  └─────────────────────────────────────────────────────────┘ ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ Right: Dark code editor card (#1e1e2e background)       │ ║
║  │ [Code with syntax highlighting]                         │ ║
║  │ [Output section with green text]                        │ ║
║  └─────────────────────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════════════╗
║  STATS SECTION (White/light blue background)                 ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │ 4 Cards with:                                           │ ║
║  │ - White backgrounds                                    │ ║
║  │ - Soft shadows                                         │ ║
║  │ - Purple/blue text for values                          │ ║
║  │ - Emoji icons                                          │ ║
║  └─────────────────────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════════════╗
║                    BATCHES SECTION (White)                    ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════════════╗
║                   FOOTER (Dark background)                    ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 📐 Hero Section - Detailed Layout

### Desktop (1024px+) - Two-Column Layout

```
┌──────────────────────────────────────────────────────┐
│          HERO SECTION - DESKTOP VIEW                 │
├────────────────────────────┬────────────────────────┤
│                            │                        │
│      TEXT CONTENT         │   CODE EDITOR CARD     │
│      (Left 50%)           │   (Right 50%)          │
│                            │                        │
│  ┌─────────────────────┐   │  ┌──────────────────┐ │
│  │ Build Skills.       │   │  │ ⭕⭕⭕ app.js  │ │
│  │ Get Hired.          │   │  │                  │ │
│  │ Start Your          │   │  │ // Learn code   │ │
│  │ Tech Career.        │   │  │ function show() {│ │
│  │                     │   │  │   log(...);      │ │
│  │ [Subtitle text      │   │  │ }                │ │
│  │  about learning     │   │  │                  │ │
│  │  & placements]      │   │  │ > Hello, Dev!   │ │
│  │                     │   │  │                  │ │
│  │ [Button] [Button]   │   │  │  🔴 Live Preview │ │
│  │                     │   │  └──────────────────┘ │
│  │ ★ 4.8/5 Rating     │   │                        │
│  │ 👥 10,000+ Users   │   │  [Floating Elements]  │
│  └─────────────────────┘   │                        │
│                            │                        │
└────────────────────────────┴────────────────────────┘
```

### Tablet (768px) - Stacked Layout

```
┌──────────────────────────────────────────┐
│     HERO SECTION - TABLET VIEW            │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │      TEXT CONTENT (100% width)      │ │
│  │                                     │ │
│  │ Build Skills. Get Hired. Start...   │ │
│  │                                     │ │
│  │ [Button] [Button]                   │ │
│  │ ★ 4.8/5 | 👥 10,000+               │ │
│  └─────────────────────────────────────┘ │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │   CODE EDITOR CARD (100% width)     │ │
│  │                                     │ │
│  │ [Code content centered]             │ │
│  │                                     │ │
│  └─────────────────────────────────────┘ │
│                                          │
└──────────────────────────────────────────┘
```

### Mobile (480px) - Vertical Stack

```
┌──────────────────┐
│ HERO - MOBILE    │
├──────────────────┤
│ Build Skills.    │
│ Get Hired.       │
│ Start Your       │
│ Tech Career.     │
│                  │
│ [Button full]    │
│ [Button full]    │
│                  │
│ ★ 4.8/5          │
│ 👥 10,000+      │
├──────────────────┤
│  [Code Card]     │
│   (Compact)      │
├──────────────────┤
```

---

## 📊 Stats Section - Grid Layouts

### Desktop (1024px+) - 4-Column Grid

```
┌─────────┬─────────┬─────────┬─────────┐
│  STAT 1 │  STAT 2 │  STAT 3 │  STAT 4 │
│  ⭐     │   👥    │   🎯    │   🤝    │
│ 4.8/5   │10,000+  │  350+   │  40+    │
│ Rating  │Learners │Places   │Partners │
└─────────┴─────────┴─────────┴─────────┘
```

### Tablet (768px) - 2-Column Grid

```
┌─────────────────┬─────────────────┐
│     STAT 1      │     STAT 2      │
│      ⭐         │       👥        │
│    4.8/5        │     10,000+     │
├─────────────────┼─────────────────┤
│     STAT 3      │     STAT 4      │
│      🎯         │       🤝        │
│     350+        │      40+        │
└─────────────────┴─────────────────┘
```

### Mobile (480px) - 1-Column Grid

```
┌───────────────────┐
│     STAT 1        │
│       ⭐          │
│     4.8/5         │
├───────────────────┤
│     STAT 2        │
│       👥          │
│    10,000+        │
├───────────────────┤
│     STAT 3        │
│       🎯          │
│     350+          │
├───────────────────┤
│     STAT 4        │
│       🤝          │
│      40+          │
└───────────────────┘
```

---

## 🎨 Color Gradient Application

### Hero Title Gradient

```
"Build Skills. Get Hired. Start Your Tech Career."
                ▼▼▼▼▼▼▼▼▼▼
             GRADIENT TEXT
         (#6a11cb → #2575fc)
         └─ Purple to Blue
```

### Button Gradients

```
PRIMARY BUTTON:
┌──────────────────────────┐
│ Start Free Assessment →  │  ← Gradient bg
│ Hover: Darker gradient   │  ← Shadow increase
│ Press: No elevation      │  ← Pressed state
└──────────────────────────┘

SECONDARY BUTTON:
┌──────────────────────────┐
│    View Programs         │  ← Outline border
│ Hover: Fill with color   │  ← Border color changes
└──────────────────────────┘
```

### Card Backgrounds

```
HERO CODE CARD:
Background: #1e1e2e (dark)
Text: #e0e0e0 (light gray)
Keywords: #c586c0 (purple)
Functions: #dcdcaa (yellow)
Strings: #ce9178 (orange)

STAT CARDS:
Background: #ffffff (white)
Text: #333333 (dark gray)
Values: #6a11cb (purple)
Hover Glow: rgba(106, 17, 203, 0.08)
```

---

## 🎬 Animation Zones

### Hero Section Animations

```
ZONE 1: Gradient Text
  Position: In title
  Animation: Shimmer effect
  Duration: 3s loop
  
ZONE 2: Buttons
  Position: Below subtitle
  Animation: Hover elevation + shadow
  Duration: 0.3s transition
  
ZONE 3: Code Card
  Position: Right side
  Animation: Slide-in from right on load
  Duration: 0.8s
  
ZONE 4: Floating Elements
  Position: Background
  Animation: Y-axis float
  Duration: 6-8s loop
```

### Stats Section Animations

```
ZONE 1: Card Container
  Position: Main grid
  Animation: Staggered slide-up on load
  Duration: 0.6s, 0.1s apart
  
ZONE 2: Card Hover Zone
  Position: Individual cards
  Animation: Elevation + shadow
  Duration: 0.3s
  
ZONE 3: Icon Zone
  Position: Card top
  Animation: Scale 1.15 + rotate 10deg
  Duration: 0.3s
  
ZONE 4: Value Text
  Position: Large number
  Animation: Color change to gradient
  Duration: 0.3s
  
ZONE 5: Background Orbs
  Position: Behind all content
  Animation: Float up/down
  Duration: 12-18s loop
```

---

## 📏 Spacing & Sizing

### Hero Section Spacing

```
Desktop Layout:
  Top Padding:     60px
  Bottom Padding:  60px
  Side Padding:    20px
  Content Gap:     60px (between text and code)
  Title Size:      52px
  Subtitle Size:   18px

Mobile Layout:
  Top Padding:     24px
  Bottom Padding:  24px
  Side Padding:    16px
  Content Gap:     24px
  Title Size:      28px
  Subtitle Size:   14px
```

### Stats Cards Spacing

```
Desktop:
  Card Width:      260px (max)
  Grid Gap:        32px
  Card Padding:    40px
  Icon Size:       48px
  Value Size:      36px

Mobile:
  Card Width:      100%
  Grid Gap:        20px
  Card Padding:    30px
  Icon Size:       40px
  Value Size:      28px
```

---

## 🔑 Key Alignment Points

```
HORIZONTAL ALIGNMENT:
├─ Container: centered with max-width
├─ Text: left-aligned (desktop), center (mobile)
├─ Buttons: flex with gap, wrap on small screens
├─ Code Card: right-aligned (desktop), full-width (mobile)
└─ Stats Grid: 4-col (desktop) → 2-col (tablet) → 1-col (mobile)

VERTICAL ALIGNMENT:
├─ Hero: flex center (vertical center)
├─ Stats: flex column with gaps
├─ Buttons: center-aligned with flex
├─ Badge: center items in row
└─ Cards: flex column, items center
```

---

## 📱 Responsive Transformation Map

```
1400px+           1024px           768px            480px
(Large Desktop)   (Desktop)        (Tablet)         (Mobile)
───────────────────────────────────────────────────────────
2-col layout  →   2-col layout  →  Stacked    →     Stacked
4-col stats   →   4-col stats   →  2-col      →     1-col
50/50 split   →   50/50 split   →  100%      →     100%
Side buttons  →   Side buttons  →  Stacked    →     Stacked
───────────────────────────────────────────────────────────
60px padding  →   60px padding  →  40px      →     24px
32px gap      →   32px gap      →  24px      →     20px
52px title    →   52px title    →  36px      →     28px
```

---

## 🎯 Visual Hierarchy

### Hero Section Hierarchy

```
1. HERO TITLE (Largest, gradient, most prominent)
   ↓
2. SUBTEXT (Smaller, gray, supporting)
   ↓
3. PRIMARY BUTTON (Gradient, highest contrast)
   ↓
4. SECONDARY BUTTON (Outline, secondary action)
   ↓
5. TRUST BADGE (Small, supporting info)
   ↓
6. CODE CARD (Right side, visual interest)
```

### Stats Section Hierarchy

```
1. SECTION TITLE (Large, dark, prominent)
   ↓
2. STAT CARDS (4 equal cards, icon + value + label)
   ↓
3. CTA SECTION (Centered, gradient bg, conversion)
   ↓
4. BACKGROUND ELEMENTS (Subtle, decorative)
```

---

## ✅ This Visual Guide Covers

- ✅ Overall page structure
- ✅ Hero section desktop/tablet/mobile views
- ✅ Stats section grid transformations
- ✅ Color gradients and application
- ✅ Animation zones and triggers
- ✅ Spacing and sizing by breakpoint
- ✅ Alignment and positioning
- ✅ Visual hierarchy
- ✅ Responsive transformation maps

**This documentation provides a complete visual understanding of the QueNriX homepage layout and design!**
