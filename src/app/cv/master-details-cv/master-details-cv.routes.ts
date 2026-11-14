import { Routes } from "@angular/router";

import { MasterDetailsCvComponent } from "./master-details-cv.component";
import { DetailsCvComponent } from "../details-cv/details-cv.component";

/**
 * Routes du Master-Detail, montées sous le préfixe "master" dans app.routes.ts :
 *  - /master      : la liste (MasterDetailsCvComponent)
 *  - /master/:id  : le détail, affiché dans le router-outlet de la liste
 */
export const MASTER_DETAILS_CV_ROUTES: Routes = [
  {
    path: "",
    component: MasterDetailsCvComponent,
    children: [{ path: ":id", component: DetailsCvComponent }],
  },
];
