import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl;
  private token?: string;

  login(username: string, password: string): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/api/usuario/login`, {
        username,
        password,
      })
      .pipe(
        tap((token) => (this.token = token.message)),
        tap(() => {
          if (this.token) {
            localStorage.setItem('token', this.token);
          }
        })
      );
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    if (token) return of(true);
    return of(false);
  }

  logout() {
    this.token = undefined;
    localStorage.clear();
  }
}
