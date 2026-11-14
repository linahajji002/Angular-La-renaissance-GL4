import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, catchError, of } from "rxjs";

import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";
import { ListComponent } from "../list/list.component";

/**
 * Vue "master" du pattern Master-Detail :
 * affiche la liste des cvs à gauche et, à droite, un router-outlet
 * dans lequel la route fille /master/:id affiche le détail du cv sélectionné.
 */
@Component({
    selector: "app-master-details-cv",
    templateUrl: "./master-details-cv.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ListComponent, RouterOutlet, AsyncPipe]
})
export class MasterDetailsCvComponent {
  private cvService = inject(CvService);
  private toastr = inject(ToastrService);

  /** Liste des cvs de l'API ; en cas d'erreur serveur, on bascule sur les cvs fictifs. */
  cvs$: Observable<Cv[]> = this.cvService.getCvs().pipe(
    catchError(() => {
      this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
      return of(this.cvService.getFakeCvs());
    })
  );
}
