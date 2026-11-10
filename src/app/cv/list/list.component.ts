import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Cv } from "../model/cv";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent {
  @Input() cvs: Cv[] | null = [];
  /**
   * Route de base du détail (ex: "/master") : si elle est fournie, chaque cv devient un lien vers detailsLink/id
   */
  @Input() detailsLink: string | null = null;
}
