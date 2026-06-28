# Chandan Mahanty — Professional Portfolio

A premium, high-performance personal brand portfolio custom-designed for Chandan Mahanty, a Digital Marketing Specialist and Meta Ads Expert. This application features custom 3D animations, interactive interfaces, a performance-optimized design, and verified metrics display to showcase professional campaigns and expertise.

## Features

- **Interactive 3D Elements:** Immersive 3D components including a rotating vision statement manifesto and responsive 3D contact cards.
- **Dynamic Case Studies:** Custom categorizable portfolio showcases detailed strategies and results for verified advertising campaigns.
- **Cinematic Atmosphere:** Sleek luxury dark mode aesthetic with custom cursor trails, ambient grid animations, and fluid state transitions.
- **Production-Hardened Security:** Built-in Content Security Policy (CSP), anti-clickjacking protection, strict referrer policies, and secure external link configurations.
- **SEO & Performance Optimized:** High-fidelity structure optimized for mobile responsiveness, search engine rankings, and quick loading speeds.

## Tech Stack

- **Core Framework:** React 19, TypeScript
- **Styling:** CSS3, Tailwind CSS (via Vite plugin)
- **Animations:** Motion (Framer Motion)
- **Icons:** Lucide React
- **Build System:** Vite 6

## Installation

Ensure Node.js (v18+) is installed on your local machine.

1. Clone the repository to your local system:
   ```bash
   git clone https://github.com/Anirudra764/chandu-.git
   ```
2. Navigate to the project directory:
   ```bash
   cd chandu-
   ```
3. Install all required dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Configure required environment variables before running the project.

Create a `.env` or `.env.local` file in the root directory and define the application host URL:
```env
APP_URL="https://yourdomain.com"
```

## Development

To start the local development server with hot module replacement (HMR):
```bash
npm run dev
```
The application will be served locally at `http://localhost:3000`.

## Production Build

To compile and optimize the application for production deployment:
```bash
npm run build
```
Vite will compile, bundle, and minify the assets into the `dist/` directory. The production build is fully optimized:
- Source maps are automatically disabled to protect proprietary source code.
- Console logs, warn, and debugger statements are stripped during build time to optimize performance.

## Folder Structure

```
├── public/                 # Static assets directly copied to output
│   ├── images/             # Static public images and profile pictures
│   ├── robots.txt          # Search engine crawler directives
│   └── sitemap.xml         # XML sitemap for SEO indexes
├── src/
│   ├── assets/             # Bundled illustrations and dashboard proofs
│   ├── components/         # Reusable interactive React components
│   ├── data.ts             # Static content, case studies, and services data
│   ├── index.css           # Global typography and styling guidelines
│   ├── main.tsx            # Main React mounting entrypoint
│   ├── types.ts            # TypeScript interfaces
│   └── App.tsx             # Core layout and navigation router
├── package.json            # Scripts and package dependencies
├── tsconfig.json           # TypeScript configuration guidelines
├── vercel.json             # Edge router rewrite and security headers config
└── vite.config.ts          # Vite build pipeline and plugin configurations
```

## Deployment

### Vercel Deployment
This repository is pre-configured for seamless deployment to Vercel:
- Production-grade security headers are defined inside `vercel.json` (Strict HSTS, X-Frame-Options, Content Security Policy, Permissions Policy, and X-Content-Type-Options).
- Client-side routes are rewrote to the main index entrypoint automatically.

To deploy via Vercel CLI:
```bash
vercel --prod
```

## License

Private / Proprietary. All rights reserved. Custom campaign metrics, case studies, designs, and content are the sole property of the portfolio owner.
