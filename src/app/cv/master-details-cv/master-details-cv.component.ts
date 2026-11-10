import { Component } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Cv } from "../model/cv";
import { CvService } from "../services/cv.service";

@Component({
  selector: "app-master-details-cv",
  templateUrl: "./master-details-cv.component.html",
  styleUrls: ["./master-details-cv.component.css"],
})
export class MasterDetailsCvComponent {
  cvs$: Observable<Cv[]>;

  constructor(private cvService: CvService, private toastr: ToastrService) {
    this.cvs$ = this.cvService.getCvs().pipe(
      catchError(() => {
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());
      })
    );
  }
}
