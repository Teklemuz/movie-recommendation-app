# Movie-Recommendation App
This is a Next.js project bootstrapped with create-next-app, utilizing the App Router to create a movie recommendation application. Users can browse trending movies and receive tailored recommendations, with features like dynamic routing, local data storage, and an interactive UI for an engaging experience. 

## Project Overview
The Movie Recommendation App fetches trending and recommended movies from the TMDB API, allows users to save favorites locally, and provides detailed movie pages via dynamic routing. Built with the Next.js App Router, TypeScript, and styled-components, it emphasizes modern web development practices, responsiveness, and type safety.

## Project Goals
Dynamic Routing: Leverage Next.js App Router for dynamic movie detail pages.
User Personalization: Enable saving favorite movies locally using localStorage.
Interactive Dashboard: Create a responsive, visually appealing dashboard for movie browsing.

## Technologies Used
Next.js (App Router): For server-side rendering, dynamic routing, and modern React features.
TypeScript: Ensures type safety and scalable development.
Styled-Components: For reusable, styled UI components with dynamic styling.
Axios: For API requests to the TMDB API.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Prerequisites
Node.js (v16 or higher)
npm, yarn, pnpm, or bun package manager
A TMDB API key (add to .env.local as NEXT_PUBLIC_TMDB_API_KEY)

## Gettind started
# IInstallation
1. Clone the repository:
2. git clone <github.com/Teklemuz/movie-recommendation-app>
cd movie-recommendation-app
3. Install dependencies
   npm install
4. Create a .env.local file in the root directory and add your TMDB API key:
   NEXT_PUBLIC_TMDB_API_KEY=9422b4e345928db76a562a666f024402

5. run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
6. Open http://localhost:3000 in your browser to see the app.

## Key Features
API Integration
Data Source: Fetches trending movies (/trending/movie/week) and recommended movies (/movie/top_rated) from the TMDB API.
Error Handling: Displays error messages for failed API calls.
Loading States: Shows a loading spinner during API fetches and client-side data loading.
2. Dynamic Routing
Movie Details: Detailed pages at /movie/[id] using App Router’s dynamic routes.
Optimized Rendering: Utilizes server components and generateServerProps-like patterns for fast navigation.
3. Save Favorite Movies
Local Storage: Users can save/remove favorites using localStorage via the useFavorites hook.
Favorites Section: Displays saved movies in a dedicated dashboard section.
4. Responsive and Interactive UI
Dashboard: Features favorites, trending, and recommended movie sections in a responsive grid.
Media Queries: Ensures responsiveness across devices (desktop, tablet, mobile).
Interactivity: Includes hover effects on movie cards, a hamburger menu with animations, and smooth favorite toggling.

## Implementation process
Git Commit Workflow
Initial Setup:
feat: initialize Next.js project with TypeScript and App Router
feat: integrate TMDB API for fetching movie data
Feature Development:
feat: implement dynamic movie pages with App Router
feat: add functionality to save favorite movies using localStorage
feat: implement client-side fetching for movie details in MovieCard
UI Enhancements:
style: design UI using Styled Components with responsive layouts
style: add hamburger menu animation and hover effects
Bug Fixes:
fix: resolve hydration mismatch issues
fix: address unrecognized prop warnings with styled-components
Documentation:
docs: update README with App Router details and setup instructions


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
