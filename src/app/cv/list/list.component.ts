import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { Cv } from "../model/cv";
import { NgClass } from "@angular/common";
import { ItemComponent } from "../item/item.component";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: "app-list",
    templateUrl: "./list.component.html",
    styleUrls: ["./list.component.css"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass, ItemComponent, RouterLink, RouterLinkActive]
})
export class ListComponent {
  @Input() cvs: Cv[] | null = [];
  /**
   * Route de base du détail (ex: "/master") : si elle est fournie,
   * chaque cv devient un lien vers detailsLink/id.
   */
  @Input() detailsLink: string | null = null;
}
