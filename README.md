# Wave Health Dashboard

A modern, responsive user management dashboard built for a senior frontend engineer take-home assessment. Features real-time search, multi-column sorting, detailed user modals, and a sleek dark theme inspired by healthcare technology design patterns. Built with React, TypeScript, and Tailwind CSS.

**🚀 [Live Demo](https://demivlkv.github.io/wave-health/)**

## Getting Started

Quick setup to get the dashboard running locally. The app fetches users from JSONPlaceholder API, displays them in a searchable/sortable table, and includes a form to add new users. A sample `.env.example` file is provided.

```bash
npm install && npm run dev
# Open http://localhost:5173
```

### Prerequisites

- Node.js 22.12+ (required for Vite 5+ and Tailwind CSS v4)
- npm or yarn

### Installing

```bash
# Clone and install
git clone https://github.com/demivlkv/wave-health.git
cd wave-health
npm install
```

```bash
# Create environment file
cp .env.example .env.local
# Edit .env.local with your preferred settings
```

```bash
# Start development server
npm run dev
```

```bash
# Build for production
npm run build
npm run preview
```

**Demo the features**: Search for users, click column headers to sort, click any user row to view details, navigate to "Add User" to create new entries.

## Testing

Comprehensive test suite using Vitest and React Testing Library.

```bash
npm run test          # Run tests in watch mode
npm run test:ui       # Visual test runner
npm run test:coverage # Generate coverage report
```

### Component Tests

Tests user interactions, form validation, and UI behavior:

```bash
# Test search functionality
npm run test SearchBar

# Test sorting logic
npm run test SortableHeader
```

## Deployment

Optimized for modern hosting platforms:

```bash
npm run build  # Generates dist/ folder
```

Deploy the `dist/` folder to Netlify, Vercel, or any static hosting service. The app is a SPA with client-side routing.

## Built With

- **[Vite](https://vitejs.dev/)** + **[React](https://reactjs.org/)** - Fast build tool and dev server
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[React Testing Library](https://testing-library.com/react)** - Component testing utilities
- **[JSONPlaceholder API](https://jsonplaceholder.typicode.com/users)** - Users API

## Screenshots

![screenshot: homepage](/../main/src/assets/screenshots/home.png)
![screenshot: add user form](/../main/src/assets/screenshots/add-user.png)

## Architecture & Design Decisions

### State Management

**Context API** - Chosen over Redux for simplicity and project scope. The `UsersContext` centralizes user data and operations while keeping the bundle lightweight.

### Component Architecture

**Composition Pattern** - Modular, testable components with clear separation of concerns:

```
UsersList → SearchBar + SortableHeader + UserRow + UserModal
AddUserForm → InputField components with validation
```

### Styling Approach

**Tailwind + Dark Theme** - Utility-first CSS with a cohesive dark theme inspired by the healthcare technology sector. Responsive design with mobile-first approach.

### Performance Optimizations

- **useMemo** - Memoizes expensive filtering/sorting operations
- **Code Splitting** - Route-based lazy loading
- **Efficient Re-renders** - Proper dependency arrays

## Key Features Implemented

- **User Management** - Fetch from JSONPlaceholder API
- **Search & Filter** - Real-time search by name/email
- **Multi-column Sorting** - Name, email, city, company with direction toggle
- **User Details Modal** - Complete profile information
- **Add User Form** - Client-side validation and form state management
- **Responsive Design** - Mobile-optimized layouts
- **Error Handling** - Loading states and error recovery
- **Testing Coverage** - Unit and integration tests

### Conscious Trade-offs Made

- **State Management**: Context API vs Redux (simplicity over advanced tooling)
- **Form Validation**: Basic client-side vs schema validation (Zod/Yup)
- **Performance**: Basic optimization vs advanced techniques (virtualization)
- **Accessibility**: Core ARIA vs comprehensive WCAG 2.1 AA compliance

### Future Enhancements

- **Advanced Features**: Authentication, bulk operations, data export, infinite scroll
- **Performance**: Virtual scrolling for large lists, React Query for caching
- **Testing**: E2E tests with Playwright, visual regression testing
- **Code Quality**: Error boundaries, comprehensive TypeScript coverage, additional refactoring
- **UX**: Skeleton loading, improved personalized experience, light theme, notifications, advanced search suggestions

## Acknowledgments

- **Treatment Technologies & Insights** & **Wave Health** - Design & color inspiration for UI

---

Built by **Demi Hayashi** (hayashi.demi@gmail.com)
