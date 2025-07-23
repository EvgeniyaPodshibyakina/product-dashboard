import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import data from '../../public/db.json'; 

export const server = setupServer(
  
  http.get('http://localhost:5173/db.json', ({ request }) => {
    const url = new URL(request.url);

    if (url.searchParams.has('networkError')) {
      return HttpResponse.error(); 
    }

    if (url.searchParams.has('serverError')) {
      return new HttpResponse(null, { status: 500, statusText: 'Internal Server Error' });
    }

    return HttpResponse.json(data.products); 
  })
);