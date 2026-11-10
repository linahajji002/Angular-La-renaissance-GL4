import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { CvSharedModule } from "./cv-shared.module";
import { CvComponent } from "./cv/cv.component";
import { AddCvComponent } from "./add-cv/add-cv.component";
import { EmbaucheComponent } from "./embauche/embauche.component";
import { DetailsCvComponent } from "./details-cv/details-cv.component";
import { AuthGuard } from "../auth/guards/auth.guard";

/** Routes relatives au préfixe "cv" défini dans AppRoutingModule. */
const CV_ROUTES: Routes = [
  { path: "", component: CvComponent },
  { path: "add", component: AddCvComponent, canActivate: [AuthGuard] },
  { path: ":id", component: DetailsCvComponent },
];

@NgModule({
  declarations: [CvComponent, AddCvComponent, EmbaucheComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CvSharedModule,
    RouterModule.forChild(CV_ROUTES),
  ],
})
export class CvModule {}
