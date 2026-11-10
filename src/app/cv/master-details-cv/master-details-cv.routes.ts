import { Routes } from "@angular/router";
import { MasterDetailsCvComponent } from "./master-details-cv.component";
import { DetailsCvComponent } from "../details-cv/details-cv.component";

export const MASTER_DETAILS_CV_ROUTES: Routes = [
  {
    path: "",
    component: MasterDetailsCvComponent,
    children: [{ path: ":id", component: DetailsCvComponent }],
  },
];
