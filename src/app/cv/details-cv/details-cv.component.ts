import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { EMPTY, Observable, catchError, map, switchMap } from 'rxjs';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth/services/auth.service';

import { DefaultImagePipe } from '../pipes/default-image.pipe';

@Component({
    selector: 'app-details-cv',
    templateUrl: './details-cv.component.html',
    styleUrls: ['./details-cv.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DefaultImagePipe, AsyncPipe]
})
export class DetailsCvComponent {
  private cvService = inject(CvService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  authService = inject(AuthService);

  /**
   * Le cv affiché. On écoute paramMap (et non le snapshot) car, dans le
   * Master-Detail, le composant est réutilisé quand on passe de /master/1
   * à /master/2 : seul le paramètre :id change.
   */
  cv$: Observable<Cv> = this.activatedRoute.paramMap.pipe(
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
