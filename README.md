# 📊 Product Dashboard

A fast, interactive dashboard built with **React**, **TypeScript**, and **Redux Toolkit**, featuring real-time charts, dynamic filters, and clean modular architecture.

## 🔧 Technologies

- React + TypeScript
- Redux Toolkit + RTK Query
- Recharts for interactive charts
- Modular SCSS
- Vitest + MSW for testing

## ✨ Highlights

- Dynamic product switching with data-driven interface
- CSV report generation
- Chart components with time frame toggles
- Unit-tested Redux slices, API services, and components
- Fast dev experience with Vite


## Setup and Running Instructions

### Prerequisites
This project was made with Vite:
- Node.js (>= 18.x)
- npm

### Setup

1. Clone the repository

   ```sh
     git clone https://github.com/your-username/product-dashboard.git
     cd product-dashboard
   ```
2. Install the dependencies:

   ```sh
   npm install
   ```

### Running the Application

To start the application in development mode:

```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## Testing

I have added extensive test coverage for this project, including unit tests for slices, services (APIs), and key components. The tests were implemented using **Vitest** for its speed and integration with Vite, replacing the more commonly used Jest.

To run the tests, use the following command:

```sh
npm run test
```

This will execute all the unit tests and display the results.

## Challenges Faced

- **API-less Setup**: With no real API available, I used `db.json` as a mock data source, but integrating an actual API remains a future improvement.
- **Tests Setup with Vitest**: Vite introduced some challenges when it came to setting up Jest for testing. To resolve this, I transitioned to **Vitest**, which is more optimized for Vite-based projects and offers faster test execution. Additionally, the upgrade to **MSW 2.0** brought about significant changes, and migrating from version 1.x to 2.x introduced complexities, particularly in testing the **ProductApi** with Redux and RTK Query. These updates required refactoring the API mocks and test structure.

## Additional Information

### Key Features and Changes

- **DB Integration**: Replaced mock data files with a `db.json` file for centralized data management and easier access to product data.
- **Redux and RTK Query**: Integrated Redux and RTK Query for state management and efficient data fetching with caching.
- **Modular SCSS**: SCSS files were modularized, and color variables were introduced for a more maintainable and consistent design.
- **Custom Hooks**: Refactored component logic into reusable custom hooks, improving code reusability, maintainability, and keeping components focused on rendering.
- **Memoization**: Added memoization to optimize performance, preventing unnecessary re-renders and recalculations when handling large datasets.
- **Utility Functions**: Added a utility for standardized error handling to ensure consistent error display across the app.

### Future Improvements

- **API Integration**: Replace the local `db.json` with a real API to dynamically fetch product data.
- **Enhanced Reporting**: Expand the reporting functionality to include multiple file formats and customizable report generation.
- **Responsive Design**: Improve media queries and responsive layouts for mobile and tablet devices.
  
### Scaling Considerations

- **Performance Optimization**: Continuously optimize the performance for larger datasets, especially when more products are added.
- **Theming and Styling**: Continue expanding on SCSS variables for more flexible theming.
- **Advanced State Management**: Extend Redux and RTK Query as the app grows, especially if more complex interactions like editing or deleting product data are introduced.
