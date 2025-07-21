//prettier-ignore

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
Netflix Clone Project Structure
This file outlines a clean architecture for a simplified Netflix clone built with React, Vite, and the TMDB API. The structure separates concerns into data (API), UI (components), routing, and styles, ensuring modularity and maintainability.
netflix-clone/
├── public/
│ ├── netflix-logo.png # Netflix logo or static assets
│ └── favicon.ico # App favicon
├── src/
│ ├── api/ # Data layer: API calls and data handling
│ │ └── tmdb.js # TMDB API functions (uses axios)
│ ├── components/ # Reusable UI components
│ │ ├── common/ # Shared components
│ │ │ ├── MovieCard.jsx # Movie poster and title
│ │ │ └── MovieList.jsx # Horizontal list of movies
│ │ ├── layout/ # Layout components
│ │ │ └── Navbar.jsx # Navigation bar (uses lucide-react, react-fontawesome)
│ │ └── features/ # Feature-specific components
│ │ └── MovieDetails.jsx # Movie details with trailer (uses react-youtube)
│ ├── pages/ # Page-level components (route-specific)
│ │ ├── Home.jsx # Main page with movie lists
│ │ └── NotFound.jsx # 404 page for invalid routes
│ ├── routes/ # Routing configuration
│ │ └── index.jsx # Route definitions (uses react-router-dom)
│ ├── styles/ # CSS for components and global styles
│ │ ├── global.css # Global styles (body, resets)
│ │ ├── navbar.css # Navbar-specific styles
│ │ ├── movie-card.css # Movie card styles
│ │ ├── movie-list.css # Movie list styles
│ │ └── movie-details.css # Movie details styles
│ ├── App.jsx # Main app component (entry for routing)
│ ├── main.jsx # React entry point
│ └── constants.js # Constants (e.g., API base URL, categories)
├── .env # Environment variables (TMDB API key)
├── .gitignore # Ignore node_modules, .env, etc.
├── package.json # Dependencies and scripts
├── vite.config.js # Vite configuration
└── README.md # Project documentation

Structure Explanation

public/: Static assets like the Netflix logo.
src/api/: Handles TMDB API calls using axios for fetching movies and trailers.
src/components/:
common/: Reusable UI components like MovieCard and MovieList.
layout/: Structural components like Navbar (uses lucide-react for icons, react-fontawesome for brand icons).
features/: Feature-specific components like MovieDetails (uses react-youtube for trailers).

src/pages/: Page-level components for routing (e.g., Home for movie lists, NotFound for 404 errors).
src/routes/: Centralized routing logic using react-router-dom.
src/styles/: Modular CSS files for each component to keep styles scoped and maintainable.
src/constants.js: Stores constants like API URLs and movie categories to avoid hardcoding.
.env: Stores sensitive data like VITE_TMDB_API_KEY (ignored by Git).
package.json: Includes dependencies and scripts for Vite.

Setup Instructions

Create the project with Vite:npm create vite@latest netflix-clone -- --template react
cd netflix-clone

Install dependencies:npm install axios@^1.7.7 react@^18.3.1 react-dom@^18.3.1 react-router-dom@^6.26.1 react-youtube@^10.1.0 lucide-react@^0.441.0 @fortawesome/react-fontawesome@^0.2.2 @fortawesome/free-brands-svg-icons@^6.6.0

Create the folder structure:mkdir src/api src/components src/components/common src/components/layout src/components/features src/pages src/routes src/styles
touch src/api/tmdb.js src/components/common/MovieCard.jsx src/components/common/MovieList.jsx src/components/layout/Navbar.jsx src/components/features/MovieDetails.jsx src/pages/Home.jsx src/pages/NotFound.jsx src/routes/index.jsx src/styles/global.css src/styles/navbar.css src/styles/movie-card.css src/styles/movie-list.css src/styles/movie-details.css src/constants.js

Add .env with your TMDB API key:VITE_TMDB_API_KEY=your_api_key_here

Add .gitignore:node_modules/
.env
dist/

Run the app:npm run dev

Why This Structure?

Separation of Concerns: API logic (api/), UI (components/), routing (routes/), and styles (styles/) are isolated.
Scalability: Adding new features (e.g., search, user profiles) is easy with dedicated features/ and pages/ folders.
Maintainability: Modular CSS and constants reduce duplication and errors.
Reusability: common/ components like MovieCard can be reused across pages.
# Netflix-React-Clone
