import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { CvSharedModule } from "../cv-shared.module";
import { MasterDetailsCvComponent } from "./master-details-cv.component";
import { MASTER_DETAILS_CV_ROUTES } from "./master-details-cv.routes";

/** Module lazy du Master-Detail (lot 5), monté sur le préfixe "master". */
@NgModule({
  declarations: [MasterDetailsCvComponent],
  imports: [
    CommonModule,
    CvSharedModule,
    RouterModule.forChild(MASTER_DETAILS_CV_ROUTES),
  ],
})
export class MasterDetailsCvModule {}
