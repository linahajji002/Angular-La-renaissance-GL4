import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { TodoComponent } from "./todo/todo/todo.component";
import { FrontComponent } from "./templates/front/front.component";
import { LoginComponent } from "./auth/login/login.component";
import { NF404Component } from "./components/nf404/nf404.component";
import { CustomPreloadingStrategy } from "./custom-preloading.strategy";

const routes: Route[] = [
  { path: "login", component: LoginComponent },
  {
    path: "rh",
    loadChildren: () =>
      import("./optimizationPattern/rh.module").then((m) => m.RhModule),
  },
  {
    path: "cv",
    loadChildren: () => import("./cv/cv.module").then((m) => m.CvModule),
    data: { preload: true },
  },
  {
    path: "master",
    loadChildren: () =>
      import("./cv/master-details-cv/master-details-cv.module").then(
        (m) => m.MasterDetailsCvModule
      ),
  },
  {
    path: "",
    component: FrontComponent,
    children: [
      { path: "todo", component: TodoComponent },
      {
        path: "word",
        loadChildren: () =>
          import("./directives/mini-word/mini-word.module").then(
            (m) => m.MiniWordModule
          ),
      },
    ],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./templates/admin/admin.module").then((m) => m.AdminModule),
  },
  { path: "**", component: NF404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
