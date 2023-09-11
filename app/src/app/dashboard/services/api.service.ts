import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environments';
import { Observable, catchError, map, of } from 'rxjs';
import { GetImages, Image } from '../interfaces/image.interface';
import { Config, GetConfigs } from '../interfaces/config.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl;

  uploadImage(form: FormData): Observable<string> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/api/uploads/bg`, form)
      .pipe(
        map((res) => res.message),
        catchError((error) => {
          return of(error);
        })
      );
  }

  getImages(): Observable<Image[]> {
    return this.http
      .get<GetImages>(`${this.baseUrl}/api/uploads/bg`)
      .pipe(map((res) => res.message));
  }

  uploadJSON(form: FormData): Observable<string> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/api/uploads/json`, form)
      .pipe(
        map((res) => res.message),
        catchError((error) => {
          return of(error);
        })
      );
  }

  getConfigs(): Observable<Config[]> {
    return this.http
      .get<GetConfigs>(`${this.baseUrl}/api/uploads/json`)
      .pipe(map((res) => res.message));
  }
}
