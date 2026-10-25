import { ApplicationConfig, importProvidersFrom, inject, isDevMode, provideAppInitializer } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import { provideRouter } from "@angular/router";
import { provideServiceWorker } from "@angular/service-worker";
import { ToastrModule } from "ngx-toastr";

import { AuthInterceptorProvider } from "./auth/interceptors/auth.interceptor";
import { AuthService } from "./auth/services/auth.service";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi(), withXhr()),
    provideAnimations(),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
    importProvidersFrom(ToastrModule.forRoot()),
    AuthInterceptorProvider,
    provideAppInitializer(() => inject(AuthService).restoreSession()),
  ],
};

