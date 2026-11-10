import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MiniWordComponent } from "./mini-word.component";

/** SCAM (Single Component Angular Module) : rend MiniWordComponent lazy. */
@NgModule({
  declarations: [MiniWordComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: MiniWordComponent }]),
  ],
})
export class MiniWordModule {}
