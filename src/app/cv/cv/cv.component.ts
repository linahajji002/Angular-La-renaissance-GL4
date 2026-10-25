import { Component } from "@angular/core";
import { Observable, catchError, of } from "rxjs";               // (1)
import { Cv } from "../model/cv";
import { LoggerService } from "../../services/logger.service";
import { ToastrService } from "ngx-toastr";
import { CvService } from "../services/cv.service";

@Component({
  selector: "app-cv",
  templateUrl: "./cv.component.html",
  styleUrls: ["./cv.component.css"],
})
export class CvComponent {
  cvs$: Observable<Cv[]>;                                          // (2)
  selectedCv$: Observable<Cv>;                                     // (3)
  date = new Date();

  constructor(
    private logger: LoggerService,
    private toastr: ToastrService,
    private cvService: CvService
  ) {
    this.cvs$ = this.cvService.getCvs().pipe(                      // (4)
      catchError(() => {                                           // (5)
        this.toastr.error(`
          Attention!! Les données sont fictives, problème avec le serveur.
          Veuillez contacter l'admin.`);
        return of(this.cvService.getFakeCvs());                    // (6)
      })
    );
    this.selectedCv$ = this.cvService.selectCv$;                   // (7)
    this.logger.logger("je suis le cvComponent");
    this.toastr.info("Bienvenu dans notre CvTech");
  }
}
