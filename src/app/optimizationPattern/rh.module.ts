import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { RhComponent } from "./rh/rh.component";
import { UserListComponent } from "./user-list/user-list.component";

/** Module lazy de la page RH (contient chart.js et @faker-js/faker). */
@NgModule({
  declarations: [RhComponent, UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: RhComponent }]),
  ],
})
export class RhModule {}
