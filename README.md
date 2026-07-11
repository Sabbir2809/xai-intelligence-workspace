# XAI – Intelligence Workspace

## Project Overview

The project is designed to explain how XAI processes raw data and turns it into meaningful insights. Instead of using long descriptions, the experience uses motion, interaction and a clean interface to guide users through the product.

## Live Demo

🔗 https://xai-insight.vercel.app

## Figma

🎨 https://www.figma.com/design/0g5LtIhtSMolKc9eggb9o0/Xai-insight-new

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Three.js
- React Three Fiber
- Lucide Icons

## Features

- Interactive Hero Section
- Scroll-based AI workflow
- Dashboard Preview
- Interactive 3D Network
- Dark & Light Mode
- Responsive Design
- Smooth Animations

## Project Structure

```text
xai-intelligence-workspace/
├── docs/
│   ├── Product-Documentation.pdf
│   ├── Xai.fig
│   └── Xai.png
├── public/
│   ├── logo-dark.png
│   └── logo-light.png
├── src/
│   ├── app/
│   │   ├── apple-icon.png
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── DashboardPreview.tsx
│   │   │   ├── DashboardSidebar.tsx
│   │   │   ├── MetricsGrid.tsx
│   │   │   ├── SignalsTable.tsx
│   │   │   └── ThroughputChart.tsx
│   │   ├── flow/
│   │   │   ├── InsightFlow.tsx
│   │   │   ├── StagePanels.tsx
│   │   │   └── StageRail.tsx
│   │   ├── hero/
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroScene.tsx
│   │   │   └── ParticleField.tsx
│   │   ├── layout/
│   │   │   └── Navbar.tsx
│   │   ├── signature/
│   │   │   ├── DataConstellation.tsx
│   │   │   └── SignatureSection.tsx
│   │   ├── theme/
│   │   │   ├── initial-theme.ts
│   │   │   ├── theme-provider.tsx
│   │   │   └── ThemeToggle.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── SectionEyebrow.tsx
│   │       ├── SectionShell.tsx
│   │       └── StatusPill.tsx
│   ├── constants/
│   │   └── index.ts
│   ├── data/
│   │   ├── dashboard.ts
│   │   ├── hero.ts
│   │   ├── insightFlow.ts
│   │   ├── signature.ts
│   │   └── site.ts
│   ├── hooks/
│   │   ├── use-insight-flow-timeline.ts
│   │   ├── use-mounted.ts
│   │   ├── use-prefers-reduced-motion.ts
│   │   ├── use-scroll-progress.ts
│   │   └── use-theme.ts
│   ├── lib/
│   │   ├── motion.ts
│   │   └── utils.ts
│   └── types/
│       ├── motion.ts
│       └── theme.ts
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json

```

## Technical Approach

- The application is built using a modular, component-based architecture with Next.js App Router. Each section is designed as a reusable component to keep the codebase clean, scalable and maintainable.

- Framer Motion is used for UI animations, GSAP powers timeline and scroll-based effects and React Three Fiber is used for the interactive 3D experience.

## Animation & Interaction Decisions

### Hero Section

Animated particles represent raw data and gradually become organized to visually explain the AI data processing journey.

### Insight Flow

Each step appears with smooth scroll-triggered animations to guide users through the product flow naturally.

### Dashboard Preview

Interactive tabs and animated cards make the dashboard feel like a real product interface.

### 3D Network

An interactive network built with React Three Fiber allows users to rotate and explore the visualization, representing connected AI intelligence.

## Performance

- Component-based architecture
- Optimized animations
- GPU-friendly transforms
- Responsive layout
- Smooth user interactions

## Getting Started

Clone the repository

```bash
git clone https://github.com/Sabbir2809/xai-intelligence-workspace.git
```

Go to the project folder

```bash
cd xai-intelligence-workspace
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Open your browser

```text
http://localhost:3000
```

## Author

**Md Sabbir Hossain**

GitHub: https://github.com/Sabbir2809

Portfolio: https://sabbircse.netlify.app
