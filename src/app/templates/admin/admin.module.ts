import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { ColorComponent } from "../../components/color/color.component";

/** Module lazy de l'espace admin (layout + route fille "color"). */
@NgModule({
  declarations: [AdminComponent, ColorComponent],
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AdminComponent,
        children: [{ path: "color", component: ColorComponent }],
      },
    ]),
  ],
})
export class AdminModule {}
