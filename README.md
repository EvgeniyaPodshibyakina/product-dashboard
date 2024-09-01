# açai-travel-test

# Product Dashboard

This project is a **Product Dashboard** application built with React and TypeScript. The dashboard provides an overview of various product performance metrics, including sales data, conversion rates, customer reviews, and inventory status. Users can switch between different products (Sweater, Jacket, Jeans, Dress) to view specific data related to each product.

## Project Structure

The project is structured as follows:

- **components**: Contains components used across the application, including charts, inventory display, comments, and buttons.
  - **ConversionRateOverTime**: Component displaying conversion rate trends over time.
  - **CurrentInventory**: Component displaying current inventory status.
  - **CustomerReviewTrend**: Component displaying customer review trends over time.
  - **GenerateReportButton**: Component providing functionality to generate and download a CSV report.
  - **LatestComments**: Component displaying the latest customer comments.
  - **LineChartWithToggle**: A generic reusable component for line charts with a toggle feature for different timeframes.
  - **ProductDataDisplay**: Component displaying all product data (Sales, Conversion, Reviews, Inventory, and Comments).
  - **ProductSelector**: Component allowing users to select a product to view data for.
  - **SalesOverTime**: Component displaying sales trends over time.

- **mockData**: Contains mock data files used to simulate real data for each product.

- **sections/ProductDashboard**: Contains the main dashboard layout, which includes the Product Selector and the Product Data Display components.

- **App.tsx**: Which displays the Product Dashboard itself

## Setup and Running Instructions

### Prerequisites
This project was made with Vite
- Node.js (>= 18.x)
- npm

### Setup

1. Clone the repository

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

## Additional Information

### Challenges Faced

- **Defining Mock Data**: Not my favorite part, I would have preferred to have an api from which to fetch the data. Even if it means addig data transformation functions to meet libraries requirement for data format (Recharts, for example)
- **Reusable Components**: Line chart had to be generic because there are 3 charts that are almost identical.
- **State Management**: Handling state between different components, especially for data filtering and the product selector, required careful planning.
  But in the same category of State management I think using state managers (as Redux) would have been over-engineering at this point.

### Future Improvements

- **API Integration**: Integrate with a real API to fetch product data dynamically.
- **Enhanced Reporting**: Expand the reporting functionality to include more file formats and customizable report content.
  
  ### In case of scaling the project 

- **Performance Optimization**: Continue to optimize the performance, especially for large datasets.
- **Styles Optimization**: Add variables for colors.
- **State managment tools**: Add Redux, Zustand or something else for state management depending on which data fetching tool will be chosen, for example RTK Query in case of using Redux.

