import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { CvService } from '../services/cv.service';
import { Cv } from '../model/cv';

@Component({
  selector: 'app-autocomplete',
  standalone: false,
  templateUrl: './autocomplete.component.html',
})
export class AutocompleteComponent {
  private cvService = inject(CvService);

  search = new FormControl('', { nonNullable: true });

  cvs$: Observable<Cv[]> = this.search.valueChanges.pipe(
    map((value) => value.trim()),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((name) =>
      name.length === 0
        ? of([])
        : this.cvService.selectByName(name).pipe(catchError(() => of([])))
    )
  );

  selectCv(cv: Cv) {
    this.cvService.selectCv(cv);
    this.search.setValue('');
  }
}