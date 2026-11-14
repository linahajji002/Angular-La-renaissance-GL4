import { Routes } from "@angular/router";

import { AuthGuard } from "../auth/guards/auth.guard";

/**
 * Slice de routes de la feature Cv, chargée en lazy sous le préfixe "cv"
 * (voir app.routes.ts). Chaque page est elle-même un chunk séparé.
 */
export const CV_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./cv/cv.component").then((m) => m.CvComponent),
    data: { preload: true },
  },
  {
    path: "add",
    loadComponent: () =>
      import("./add-cv/add-cv.component").then((m) => m.AddCvComponent),
    canActivate: [AuthGuard],
  },
  {
    path: ":id",
    loadComponent: () =>
      import("./details-cv/details-cv.component").then(
        (m) => m.DetailsCvComponent
      ),
    data: { preload: true },
  },
];
