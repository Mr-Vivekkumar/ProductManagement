import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor'; // import the function
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      })
    ),
    provideAnimations(),
    // Provide HttpClient with interceptors
    provideHttpClient(
      withInterceptors([authInterceptor]) // Interceptor is added here
    ),

    // Provide zone change detection
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Provide the router with routes
    provideRouter(routes),

    // Provide client-side hydration (for SSR)
    provideClientHydration(),
  ],
};
