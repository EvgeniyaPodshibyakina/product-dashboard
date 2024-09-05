
# açai-travel-test

# Product Dashboard

This project is a **Product Dashboard** application built with React, TypeScript, and Redux. The dashboard provides an overview of various product performance metrics, including sales data, conversion rates, customer reviews, and inventory status. Users can switch between different products (Sweater, Jacket, Jeans, Dress) to view specific data related to each product. The project is optimized for reusability and performance, utilizing custom hooks, memoization, modular SCSS styling, and utility functions for consistent error handling.

## Project Structure

The project is structured as follows:

- **components**: Contains reusable components used across the application, including charts, inventory display, comments, and buttons.
  - **ConversionRateOverTime**: Component displaying conversion rate trends over time.
  - **CurrentInventory**: Component displaying current inventory status.
  - **CustomerReviewTrend**: Component displaying customer review trends over time.
  - **GenerateReportButton**: Component providing functionality to generate and download a CSV report.
  - **LatestComments**: Component displaying the latest customer comments.
  - **LineChartWithToggle**: A generic reusable component for line charts with a toggle feature for different timeframes.
  - **ProductDataDisplay**: Component displaying all product data (Sales, Conversion, Reviews, Inventory, and Comments).
  - **ProductSelector**: Component allowing users to select a product to view data for.
  - **SalesOverTime**: Component displaying sales trends over time.

- **hooks**: Contains custom hooks extracted from components to improve maintainability, reusability, and separation of concerns.
  - **redux**: Contains Redux-specific hooks for dispatching and selecting from the store.
    - **reduxHooks.ts**: Includes `useAppDispatch` and `useAppSelector` to manage Redux state efficiently.
  - **ui**: Contains UI-specific hooks to handle UI-related logic and state management.
    - **useTimeFrame.ts**: Manages the time frame selection logic for charts, ensuring flexibility in filtering data over different periods.
    - **useReportData.ts**: Prepares and structures data for generating reports, including functions for CSV generation and download functionality.
      - **types**: Includes relevant TypeScript interfaces and types for the `useReportData` hook.

- **services**: Contains the RTK Query setup for data fetching and API interactions.
  - **productApi**: Configured RTK Query API slice for fetching product data from `db.json`.

- **store**: Contains the Redux store and slices for state management.
  - **productSlice**: Redux slice for managing selected products.

- **styles**: Modular SCSS files with variables for consistent color usage and theme management.
  - **colors.scss**: A centralized file for color variables used throughout the application.

- **utils**: Utility functions for common functionality across the application.
  - **errorHandler.ts**: A utility function to standardize error handling and display consistent error messages.

- **db.json**: Serves as the local data source, replacing mock data files.

- **sections/ProductDashboard**: Contains the main dashboard layout, which includes the Product Selector and the Product Data Display components.

- **App.tsx**: The root component that renders the Product Dashboard and integrates global state management with Redux.

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

The application will be available at `http://localhost:5174`.

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
