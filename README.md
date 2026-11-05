🛒 বাজার দর | BazarDor
<p align="center">
  <strong>আপনার প্রতিদিনের বাজারদর, এক নজরে।</strong>
  <br />
  A responsive Bangla market-price web application for exploring everyday product prices, comparing market trends, and checking product details.
  <br /><br />
  <a href="https://bazar-dor-web-beta.vercel.app/"><strong>🌐 Live Demo</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/riaduldev/bazar-dor-web"><strong>💻 GitHub Repository</strong></a>
</p>
<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Better Auth" src="https://img.shields.io/badge/Auth-Better_Auth-111827" />
  <img alt="Vercel" src="https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel" />
</p>
---
📖 About the Project
BazarDor (বাজার দর) is a Bangla-focused market-price application that helps users explore the prices of everyday essentials in one place. It presents rising and falling product prices, category-wise listings, product details, and market comparisons through a clean and responsive interface.
The application is built with the Next.js App Router, TypeScript, and a reusable component-based architecture. Users can browse product information, sort products by price, and access protected product features after signing in.
> **Price note:** Prices shown in BazarDor are indicative and may vary depending on the market, location, and time. They should not be treated as guaranteed or official quotations.
✨ Key Features
Responsive Bangla Interface — A mobile-first layout designed for mobile, tablet, laptop, and desktop screens, with Bangla labels and localized price formatting.
Market Trend Sections — Dedicated sections for the top six products with rising prices and the top six products with falling prices, based on their percentage changes.
Product Discovery and Categories — Browse all products or explore products by category. Product cards display an icon or illustration, name, unit, today's price, and price-change indicator.
Product Details and Market Comparison — View a product summary, category, unit, minimum/maximum/average price information, and market-wise price data when provided by the API.
Numeric Price Sorting — Sort category products by default order, lowest price, or highest price using numeric values rather than alphabetical string comparison. Bengali-formatted prices are displayed to users.
Live-Scrolling Price Ticker — A continuously scrolling strip highlights product names, prices, units, and price movements.
Authentication with Better Auth — Email/password authentication plus Google and GitHub social sign-in, backed by MongoDB.
Profile Management — A profile area with an option to update the user's name.
Helpful UI States and Notifications — Loading skeletons, loading indicators, friendly not-found and error pages, and toast feedback for relevant user actions.
Protected Pages and Navigation — Authentication-aware access to protected product features, with clear navigation and a return-to-home action for invalid pages.
🧰 Technology Stack
Technology	Purpose
Next.js 16	React framework for the application, rendering, and server-side data fetching
Next.js App Router	File-based routing, nested layouts, dynamic routes, loading states, and error boundaries
React 19	Reusable, interactive user-interface components
TypeScript	Static typing for components, API data, and application logic
Tailwind CSS 4	Utility-first styling and responsive layouts
DaisyUI 5	Ready-to-use UI component classes and themes
HeroUI 3	UI components for building consistent interfaces
Better Auth	Email/password and social authentication
MongoDB	Persistent storage for authentication data
React Toastify	Toast notifications for user feedback
react-marquee-text	Scrolling market-price ticker
Vercel	Production deployment and hosting
🔌 API Reference
BazarDor retrieves product and category information from the BazarDor REST API.
API base URLs
Type	Base URL
Primary API	`https://openapi.programming-hero.com/api/bazardor`
Alternative 1	`https://api.api-store.workers.dev/api/bazardor`
Alternative 2	`https://api.abcz.workers.dev/api/bazardor`
Available endpoints
Method	Endpoint	Description
`GET`	`/products`	Retrieve all products
`GET`	`/products?category=chal`	Retrieve products filtered by category
`GET`	`/products/1`	Retrieve a single product by ID
`GET`	`/categories`	Retrieve all categories
`GET`	`/categories/chal`	Retrieve a single category by slug
The API's available fields and response structure determine which product and market statistics can be displayed. The application handles the product collection from the supported response formats.
🚀 Getting Started
Follow these steps to run BazarDor locally.
Prerequisites
Node.js 20.9.0 or later
npm (included with Node.js)
A MongoDB database or MongoDB Atlas connection string
Google and GitHub OAuth applications for social sign-in (optional when testing only email/password authentication)
1. Clone the repository
```bash
git clone https://github.com/riaduldev/bazar-dor-web.git
cd bazar-dor-web
```
2. Install dependencies
```bash
npm install
```
3. Configure environment variables
Create a `.env.local` file in the project root and add the values for your local environment:
```env
# BazarDor REST API base URL
NEXT_PUBLIC_API_URL=https://openapi.programming-hero.com/api/bazardor

# Better Auth + MongoDB
BETTER_AUTH_DB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>
BETTER_AUTH_SECRET=replace_with_a_long_random_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```
Update the values to match your own API, MongoDB, and OAuth configuration. Configure the authorized callback URLs in the Google and GitHub developer consoles to match the Better Auth callback URL for your local and production domains. Never commit `.env.local` or expose private keys and secrets in client-side code.
4. Start the development server
```bash
npm run dev
```
Open http://localhost:3000 in your browser.
5. Create a production build
```bash
npm run build
npm run start
```
📜 Available Scripts
Command	Description
`npm run dev`	Start the Next.js development server
`npm run build`	Create an optimized production build
`npm run start`	Run the production server
`npm run lint`	Run ESLint checks
🗂️ Application Structure
The project uses the Next.js App Router. The following is a high-level overview; the exact component and route filenames may vary as the application evolves.
```text
bazar-dor-web/
├── public/                 # Static assets such as images and icons
├── src/
│   ├── app/                # App Router pages, layouts, and route states
│   │   ├── page.tsx        # Home page
│   │   ├── loading.tsx     # Global loading UI
│   │   ├── error.tsx       # Route error boundary
│   │   ├── not-found.tsx   # Not-found page
│   │   ├── products/       # Product routes and details
│   │   ├── categories/     # Category routes
│   │   ├── signin/         # Sign-in page (if configured with this route)
│   │   ├── signup/         # Sign-up page (if configured with this route)
│   │   └── profile/        # User profile and account information
│   └── lib/                # Shared libraries and authentication setup
├── .env.local              # Local environment variables (not committed)
├── package.json
└── README.md
```
🔐 Authentication
Authentication is handled by Better Auth with a MongoDB adapter.
Email and password registration and sign-in.
Google and GitHub social authentication.
Session-aware navigation and protected product features.
Sign-out and profile information management.
User-name update through the profile workflow.
OAuth credentials and database connection details must be configured in the environment before enabling the related authentication providers.
📱 Responsive Design
BazarDor is designed to work across common screen sizes:
Mobile: compact navigation, stacked sections, readable product cards, and touch-friendly controls.
Tablet: flexible grids and balanced spacing for medium-sized screens.
Desktop: wider content containers and multi-column product grids.
Responsive checks should include narrow mobile widths (320px–375px), standard mobile (390px–430px), tablet (768px), laptop (1024px), and desktop (1440px and above).
🚢 Deployment
The project is deployed on Vercel.
Live application: https://bazar-dor-web-beta.vercel.app
For a new deployment:
Import the GitHub repository into Vercel.
Add the required environment variables in the Vercel project settings.
Add the production domain to the trusted origins in the Better Auth configuration.
Configure Google and GitHub OAuth callback URLs for the production domain.
Deploy and verify that the home page, dynamic product/category routes, authentication, and page refreshes work correctly.
👨‍💻 Developer
Riadul Islam — Aspiring Web Developer
GitHub: @riaduldev
Project repository: riaduldev/bazar-dor-web
Live project: BazarDor
---
<p align="center">
  Made with ❤️ for a simpler way to explore everyday market prices in Bangladesh.
  <br />
  <strong>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</strong>
</p>
