import { Component, inject, signal, ChangeDetectionStrategy } from "@angular/core";
import { rxResource, toObservable, toSignal } from "@angular/core/rxjs-interop";
import { debounceTime, distinctUntilChanged, map } from "rxjs";
import { CvService } from "../services/cv.service";
import { Cv } from "../model/cv";

@Component({
  selector: "app-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent {
  private cvService = inject(CvService);

  /** Le texte tapé par l'utilisateur, mis à jour à chaque touche */
  search = signal("");

  /**
   * Le texte "calmé" : il ne change que 300 ms après la dernière frappe,
   * sans espaces autour, et seulement s'il est différent du précédent.
   */
  private debouncedSearch = toSignal(
    toObservable(this.search).pipe(
      debounceTime(300),
      map((text) => text.trim()),
      distinctUntilChanged()
    ),
    { initialValue: "" }
  );

  /**
   * La requête HTTP réactive : elle se relance quand debouncedSearch change.
   * Si params renvoie undefined (texte vide), aucune requête n'est envoyée.
   * Une nouvelle recherche annule la précédente encore en cours.
   */
  suggestions = rxResource({
    params: () => this.debouncedSearch() || undefined,
    stream: ({ params }) => this.cvService.selectByName(params),
    defaultValue: [],
  });

  /** Appelé à chaque frappe dans l'input */
  onInput(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
  }

  /** Au clic sur un choix : il devient le cv sélectionné, la carte l'affiche */
  selectCv(cv: Cv) {
    this.cvService.selectCv(cv);
    this.search.set("");
  }
}