import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import data from '../../public/db.json'; // Using data from db.json

export const server = setupServer(
  // Handling successful request
  http.get('http://localhost:5173/db.json', ({ request }) => {
    const url = new URL(request.url);

    // Check for the presence of a parameter for network error
    if (url.searchParams.has('networkError')) {
      return HttpResponse.error(); // Return network error
    }

    // Check for the presence of a parameter for server error
    if (url.searchParams.has('serverError')) {
      return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
    }

    // If no errors, return a successful response
    return HttpResponse.json(data.products); 
  })
);