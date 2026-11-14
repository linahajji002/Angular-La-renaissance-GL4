import { Routes } from "@angular/router";
import { FrontComponent } from "./templates/front/front.component";
import { NF404Component } from "./components/nf404/nf404.component";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./auth/login/login.component").then((m) => m.LoginComponent),
    data: { preload: true },
  },
  {
    path: "rh",
    loadComponent: () =>
      import("./optimizationPattern/rh/rh.component").then(
        (m) => m.RhComponent
      ),
  },
  {
    path: "cv",
    loadChildren: () => import("./cv/cv.routes").then((m) => m.CV_ROUTES),
    data: { preload: true },
  },
  {
    path: "master",
    loadChildren: () =>
      import("./cv/master-details-cv/master-details-cv.routes").then(
        (m) => m.MASTER_DETAILS_CV_ROUTES
      ),
  },
  {
    path: "",
    component: FrontComponent,
    children: [
      {
        path: "todo",
        loadComponent: () =>
          import("./todo/todo/todo.component").then((m) => m.TodoComponent),
      },
      {
        path: "word",
        loadComponent: () =>
          import("./directives/mini-word/mini-word.component").then(
            (m) => m.MiniWordComponent
          ),
      },
    ],
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./templates/admin/admin.component").then(
        (m) => m.AdminComponent
      ),
    children: [
      {
        path: "color",
        loadComponent: () =>
          import("./components/color/color.component").then(
            (m) => m.ColorComponent
          ),
      },
    ],
  },
  { path: "**", component: NF404Component },
];
