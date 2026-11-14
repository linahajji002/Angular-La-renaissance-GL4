import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

/**
 * Stratégie de préchargement sélective :
 * seules les routes lazy marquées `data: { preload: true }` sont téléchargées
 * en arrière-plan après le démarrage de l'application.
 * Les autres restent chargées uniquement à la première visite.
 */
@Injectable({ providedIn: "root" })
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    return route.data?.["preload"] === true ? load() : of(null);
  }
}
