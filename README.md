# Resource Explorer

A modern, polished React application built with Next.js and TypeScript that explores the PokéAPI dataset with advanced search, filtering, and user experience features.

## Features

### Core Functionality
- **List View with Pagination**: Browse Pokemon with efficient pagination (20 items per page)
- **Detail View**: Click any Pokemon to view detailed information including stats, abilities, and high-quality artwork
- **Search**: Debounced search functionality (300ms delay) with URL persistence
- **Filtering**: Filter Pokemon by type and view favorites
- **Sorting**: Sort by ID, name, type, height, or weight
- **Favorites**: Mark Pokemon as favorites with localStorage persistence

### Advanced Features
- **URL State Management**: All search, filter, and pagination state is preserved in URLs - shareable and reload-safe
- **Loading States**: Skeleton placeholders during data loading
- **Error Handling**: Graceful error handling with retry functionality
- **Empty States**: Helpful messages for no results scenarios
- **Optimistic UI**: Instant feedback for favorite toggles using React's useOptimistic
- **Dark/Light Theme**: Toggle between themes with system preference detection and localStorage persistence
- **Client-side Caching**: Powered by TanStack Query with background refetching

### Technical Highlights
- **Type Safety**: Fully typed with TypeScript
- **Modern React**: Uses React 19 features including useOptimistic
- **Performance**: Efficient data fetching with automatic caching and deduplication
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Accessibility**: Proper ARIA labels, focus management, and keyboard navigation

## How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Architecture and Trade-offs

### Architecture Decisions
- **Next.js App Router**: Modern routing with server components where beneficial
- **TanStack Query**: Robust data fetching with caching, background updates, and error handling
- **Tailwind CSS v4**: Utility-first CSS with dark mode support
- **Component-based Architecture**: Reusable components with clear separation of concerns
- **Custom Hooks**: Encapsulated logic for favorites, theme management, and data fetching

### Data Flow
- URL search parameters serve as the source of truth for application state
- Search queries are debounced to prevent excessive API calls
- Pokemon list uses pagination for performance
- Search results bypass pagination for immediate feedback
- Favorites are stored in localStorage with optimistic updates

### Performance Optimizations
- **Caching Strategy**: TanStack Query handles request deduplication and background refetching
- **Image Optimization**: Next.js Image component with lazy loading
- **Search Debouncing**: 300ms delay prevents excessive API calls
- **Memoization**: Proper use of useMemo and useCallback to prevent unnecessary re-renders
- **Code Splitting**: Dynamic route-based code splitting

### Trade-offs Made
1. **Search Implementation**: Client-side filtering for search rather than API search parameters due to PokéAPI limitations
2. **Pagination vs Infinite Scroll**: Chose pagination for better UX with URL state management
3. **Theme System**: Manual theme toggle over pure system preference for better user control
4. **Error Boundaries**: Component-level error handling rather than global boundaries for granular control

## What I'd Ship Next

Given more time, I would prioritize:

1. **Virtualized List Rendering**: For handling 1000+ Pokemon efficiently with react-window
2. **Advanced Filtering**: Multiple type filters, stat range filters, generation filters
3. **Comparison Feature**: Side-by-side Pokemon comparison
4. **Progressive Web App**: Service worker for offline functionality
5. **E2E Testing**: Playwright tests for critical user journeys
6. **Performance Monitoring**: Web Vitals and performance analytics
7. **Enhanced Accessibility**: Screen reader testing and keyboard navigation improvements
8. **User Preferences**: Save filter preferences and search history

## API

This application uses the [PokéAPI](https://pokeapi.co/) - a RESTful API for Pokemon data. No authentication required.

Key endpoints used:
- `GET /pokemon?limit=20&offset=0` - Pokemon list with pagination
- `GET /pokemon/{id}` - Individual Pokemon details

## Browser Support

Modern browsers supporting ES2020+ features:
- Chrome 91+
- Firefox 90+
- Safari 14+
- Edge 91+
