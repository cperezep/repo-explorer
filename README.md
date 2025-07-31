# RepoExplorer

A React application for exploring GitHub repositories for GoDaddy org. Built with TypeScript, Vite, and React Query for optimal performance and developer experience.

## 🚀 Features

- Browse GitHub organization repositories (default to GoDaddy org)
- View detailed repository information
- Responsive design
- Type-safe development with TypeScript
- Accessibility-first approach with semantic HTML and ARIA attributes
- BEM methodology for consistent CSS class naming
- Comprehensive testing suite (unit + e2e)
- Error boundary handling
- Fast development with hot module replacement

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/cperezep/repo-explorer.git
cd repo-explorer
```

2. Install dependencies:

```bash
pnpm install
```

3. Create environment file:

```bash
cp .env.example .env
```

Set your GitHub API base URL in the `.env` file:

```
VITE_BASE_URL=https://api.github.com
```

## 🏃‍♂️ Running the Project

### Development Mode

```bash
pnpm run dev
```

This starts the development server at `http://localhost:5173` with hot module replacement.

### Production Build

```bash
pnpm run build
```

### Preview Production Build

```bash
pnpm run preview
```

## 🧪 Testing

### Unit Tests

Run unit tests with Vitest:

```bash
# Run tests once
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage
```

### End-to-End Tests

Run e2e tests with Cypress:

```bash
# Open Cypress interactive mode
pnpm run cypress:open

# Run Cypress tests headlessly
pnpm run cypress:run
```

### Run All Tests

```bash
pnpm run test:all
```

## 🔍 Code Quality

### Linting

```bash
pnpm run lint
```

## 🏗️ Architecture & Technology Choices

### Core Technologies

#### **Vite instead of Next.js**

Vite was chosen over Next.js for this project because it provides fast development experience with ultra-fast Hot Module Replacement (HMR). While Next.js is excellent for full-stack applications with its opinionated file-based routing and server-side rendering capabilities, Vite offers more flexibility for client-side applications where we want full control over the application structure. The minimal configuration required to get React and TypeScript working together, combined with Vite's modern tooling built on esbuild and Rollup, makes it ideal for rapid prototyping and development without the overhead of features we don't need that Next.js provides. Vite is better than alternatives like Create React App (CRA), which has become outdated, and given the minimal scope of our app - just two routes and data fetching - we don't need the complexity of a full-featured framework. This makes Vite the perfect choice for our requirements.

#### **Vitest instead of Jest**

Vitest was selected as testing framework because it shares the same configuration and plugins as the build tool (Vite), eliminating the common configuration headaches that arise when using different tools for building and testing. Unlike Jest, which requires additional setup for ES modules and modern JavaScript features, Vitest works seamlessly out of the box with our modern tech stack. The performance benefits are significant since Vitest is built on Vite's architecture, and the Jest-compatible API means developers familiar with Jest can be productive immediately without learning a new testing syntax.

#### **React Router for Navigation**

React Router remains the industry standard for client-side routing in React applications. Even for small apps because it provides a professional routing foundation that costs nothing to implement but saves significant headaches later. While you could hack together route switching with useState and conditional rendering, React Router gives seamless navigation without page refreshes - feature users expect from any modern web app. More importantly, it establishes the correct architectural patterns from day one: when the "simple two-route app", we won't need to refactor your entire routing logic. The declarative route configuration makes the app's structure immediately clear to any developer.

#### **TanStack Query (React Query) for Data Fetching**

TanStack Query is essential even for simple applications because what seems like a "simple" GET request is actually a complex problem in disguise. When we use just useEffect and useState, we're only solving the happy path - but in reality, if we need to handle race conditions when users navigate quickly, implement retry logic for network failures, manage caching to avoid redundant API calls, deal with stale data when users switch tabs, and coordinate data sharing between multiple components. React Query abstracts all this complexity into a battle-tested solution that handles caching, synchronization, retries, and error states automatically, transforming what would be many lines of buggy custom code into just 5 lines of declarative configuration. It's not about being lazy - it's about recognizing that data fetching is a solved problem, and instead of reinventing the wheel poorly, we should use a professional-grade solution that handles all the edge cases we might not even know exist.

#### **Sass for Styling**

Sass was chosen over plain CSS or CSS-in-JS solutions because it strikes the right balance between power and simplicity for this project. The nesting capability makes styles more organized and mirrors the component hierarchy, improving maintainability. Since all valid CSS is also valid Sass, the integration with Vite requires no additional configuration.

#### **BEM Methodology for CSS Classes**

The Block Element Modifier (BEM) naming convention is employed throughout the project to ensure consistent, maintainable, and readable CSS class names. BEM provides a clear structure that makes it easy to understand the relationship between HTML elements and their styles, even for developers new to the codebase. This methodology prevents CSS specificity conflicts and makes the styles more modular and reusable, which aligns perfectly with React's component-based architecture.

### Testing Strategy & Accessibility

#### **Cypress for E2E Testing**

Cypress was selected for end-to-end testing because it provides real browser testing that captures user interactions as they actually happen, including accessibility behaviors.

#### **React Testing Library & Accessibility**

React Testing Library was chosen as the unit testing approach because it encourages testing components the way users actually interact with them, which promotes accessibility best practices. The library's queries mirror how users with assistive technologies navigate applications, using accessible names, roles, and labels. The testing strategy focuses on semantic HTML elements and ARIA attributes.

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── client/            # HTTP client configuration
│   └── services/          # API service functions
├── components/            # Reusable UI components
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── __mocks__/            # Test mocks
```

## 🌐 Environment Variables

- `VITE_BASE_URL`: GitHub API base URL (default: https://api.github.com)

## 👨‍💻 Author

**Cristian Perez**

- Email: cristian_perez@epam.com
