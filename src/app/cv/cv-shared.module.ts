import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { ItemComponent } from "./item/item.component";
import { CvCardComponent } from "./cv-card/cv-card.component";
import { DetailsCvComponent } from "./details-cv/details-cv.component";
import { DefaultImagePipe } from "./pipes/default-image.pipe";

/**
 * Briques CV partagées par les deux modules lazy CvModule (/cv)
 * et MasterDetailsCvModule (/master).
 * Un composant ne pouvant être déclaré que dans un seul NgModule,
 * on les déclare ici une fois et on les exporte.
 */
@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    CvCardComponent,
    DetailsCvComponent,
    DefaultImagePipe,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ListComponent,
    ItemComponent,
    CvCardComponent,
    DetailsCvComponent,
    DefaultImagePipe,
  ],
})
export class CvSharedModule {}
