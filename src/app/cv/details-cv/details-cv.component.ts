import { Component } from '@angular/core';
import { EMPTY, Observable, catchError, map, switchMap } from 'rxjs';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.css'],
})
export class DetailsCvComponent {
  cv$: Observable<Cv>;
  constructor(
    private cvService: CvService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    public authService: AuthService
  ) {
    this.cv$ = this.activatedRoute.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) =>
        this.cvService.getCvById(id).pipe(
          catchError(() => {
            this.goToList();
            return EMPTY;
          })
        )
      )
    );
  }

  deleteCv(cv: Cv) {
    this.cvService.deleteCvById(cv.id).subscribe({
      next: () => {
        this.toastr.success(`${cv.name} supprimé avec succès`);
        this.goToList();
      },
      error: () => {
        this.toastr.error(
          `Problème avec le serveur veuillez contacter l'admin`
        );
      },
    });
  }

  /**
   * Remonte d'un niveau dans l'url : /cv/3 => /cv, /master/3 => /master
   */
  private goToList() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
