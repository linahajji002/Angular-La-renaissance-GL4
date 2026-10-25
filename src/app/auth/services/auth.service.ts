import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { ConnectedUser } from '../model/connected-user';
import { API } from '../../../config/api.config';

/** Clés utilisées dans le localStorage (un seul endroit pour les définir). */
const STORAGE_KEYS = {
  user: 'user',
  token: 'token',
} as const;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  /** État privé : seul ce service peut le modifier. null = personne n'est connecté. */
  readonly #user = signal<ConnectedUser | null>(null);

  /** Lecture seule pour le reste de l'application. */
  readonly user = this.#user.asReadonly();

  /** Dérivé de user : recalculé uniquement quand user change. */
  readonly isAuthenticated = computed(() => this.#user() !== null);

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http
      .post<LoginResponseDto>(API.login, credentials)
      .pipe(
        tap((response) =>
          this.#saveSession(
            { id: response.userId, email: credentials.email },
            response.id
          )
        )
      );
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.token);
    this.#user.set(null);
  }

  /** Appelée au démarrage de l'application (voir app.config.ts). */
  restoreSession(): void {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    const savedUser = localStorage.getItem(STORAGE_KEYS.user);
    if (!token || !savedUser) {
      this.logout();
      return;
    }
    try {
      const user: ConnectedUser = JSON.parse(savedUser);
      this.#user.set({ id: user.id, email: user.email });
    } catch {
      this.logout();
    }
  }

  getToken(): string | null {
    return this.isAuthenticated()
      ? localStorage.getItem(STORAGE_KEYS.token)
      : null;
  }

  #saveSession(user: ConnectedUser, token: string): void {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.token, token);
    this.#user.set(user);
  }
}
