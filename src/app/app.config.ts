import { ApplicationConfig, importProvidersFrom, isDevMode } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideHttpClient, withInterceptorsFromDi, withXhr } from "@angular/common/http";
import { provideRouter, withPreloading } from "@angular/router";
import { provideServiceWorker } from "@angular/service-worker";
import { ToastrModule } from "ngx-toastr";

import { AuthInterceptorProvider } from "./auth/interceptors/auth.interceptor";
import { routes } from "./app.routes";
import { CustomPreloadingStrategy } from "./custom-preloading.strategy";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(CustomPreloadingStrategy)),
    provideHttpClient(withInterceptorsFromDi(), withXhr()),
    provideAnimations(),
    provideServiceWorker("ngsw-worker.js", {
      enabled: !isDevMode(),
      registrationStrategy: "registerWhenStable:30000",
    }),
    importProvidersFrom(ToastrModule.forRoot()),
    AuthInterceptorProvider,
  ],
};

