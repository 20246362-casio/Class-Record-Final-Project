import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// this sets up the whole app, like telling angular
// "hey use these routes and allow http calls"
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // turns on page navigation
    provideHttpClient() // lets us call the backend api
  ]
};
