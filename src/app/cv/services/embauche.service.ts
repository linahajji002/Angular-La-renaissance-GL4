import { Injectable, computed, signal } from '@angular/core';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  /**
   * La liste des cvs embauchés : modifiable uniquement par ce service
   */
  readonly #embauchees = signal<Cv[]>([]);

  /**
   * La liste des cvs embauchés en lecture seule pour le reste de l'application
   */
  readonly embauchees = this.#embauchees.asReadonly();

  /**
   * Le nombre de cvs embauchés (valeur dérivée)
   */
  readonly count = computed(() => this.#embauchees().length);

  /**
   * Embauche une personne si elle ne l'est pas encore
   * Sinon il retourne false
   *
   * @param cv : Cv
   * @returns boolean
   */
  embauche(cv: Cv): boolean {
    if (this.isEmbauche(cv)) {
      return false;
    }
    // On crée un nouveau tableau, on ne modifie jamais l'ancien (pas de push)
    this.#embauchees.update((list) => [...list, cv]);
    return true;
  }

  /**
   * Retire un cv de la liste des embauchés (utile quand le cv est supprimé)
   *
   * @param cv : Cv
   */
  remove(cv: Cv): void {
    this.#embauchees.update((list) => list.filter((e) => e.id !== cv.id));
  }

  /**
   * Vérifie si un cv est déjà embauché (comparaison par id)
   *
   * @param cv : Cv
   * @returns boolean
   */
  isEmbauche(cv: Cv): boolean {
    return this.#embauchees().some((e) => e.id === cv.id);
  }
}