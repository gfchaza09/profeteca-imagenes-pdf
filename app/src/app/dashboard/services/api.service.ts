import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environments';
import { BehaviorSubject, Observable, catchError, map, of, filter } from 'rxjs';
import { GetImages, Image } from '../interfaces/image.interface';
import { Config, GetConfigs } from '../interfaces/config.interface';
import { GetTemplates, Template } from '../interfaces/template.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl;

  private imagesSubject = new BehaviorSubject<Image[] | null>(null);
  private configsSubject = new BehaviorSubject<Config[] | null>(null);

  private templatesSubject = new BehaviorSubject<Template[] | null>(null);

  getImages(): Observable<Image[] | null> {
    this.loadImages();
    return this.imagesSubject
      .asObservable()
      .pipe(filter((images) => images !== null));
  }

  uploadImage(form: FormData): Observable<string> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/api/uploads/bg`, form)
      .pipe(
        map((res) => res.message),
        catchError((error) => of(error))
      );
  }

  loadImages(): void {
    this.http
      .get<GetImages>(`${this.baseUrl}/api/uploads/bg`)
      .pipe(map((res) => res.message))
      .subscribe((images) => {
        this.imagesSubject.next(images);
      });
  }

  deleteImage(imageId: string): Observable<string> {
    return this.http
      .delete<{ message: string }>(`${this.baseUrl}/api/uploads/bg/${imageId}`)
      .pipe(
        map((res) => res.message),
        catchError((error) => of(error))
      );
  }

  getConfigs(): Observable<Config[] | null> {
    this.loadConfigs();
    return this.configsSubject
      .asObservable()
      .pipe(filter((configs) => configs !== null));
  }

  uploadJSON(form: FormData): Observable<string> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/api/uploads/json`, form)
      .pipe(
        map((res) => res.message),
        catchError((error) => of(error))
      );
  }

  loadConfigs(): void {
    this.http
      .get<GetConfigs>(`${this.baseUrl}/api/uploads/json`)
      .pipe(map((res) => res.message))
      .subscribe((configs) => {
        this.configsSubject.next(configs);
      });
  }

  deleteConfig(configId: string): Observable<string> {
    return this.http
      .delete<{ message: string }>(
        `${this.baseUrl}/api/uploads/json/${configId}`
      )
      .pipe(
        map((res) => res.message),
        catchError((error) => of(error))
      );
  }

  getTemplates(): Observable<Template[] | null> {
    this.loadTemplates();
    return this.templatesSubject
      .asObservable()
      .pipe(filter((templates) => templates !== null));
  }

  uploadTemplate(form: FormData): Observable<string> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/api/uploads/template`, form)
      .pipe(
        map((res) => res.message),
        catchError((error) => of(error))
      );
  }

  loadTemplates(): void {
    this.http
      .get<GetTemplates>(`${this.baseUrl}/api/uploads/template`)
      .pipe(map((res) => res.message))
      .subscribe((templates) => {
        this.templatesSubject.next(templates);
      });
  }

  deleteTemplate(templateId: string): Observable<string> {
    return this.http
      .delete<{ message: string }>(
        `${this.baseUrl}/api/uploads/template/${templateId}`
      )
      .pipe(
        map((res) => res.message),
        catchError((error) => of(error))
      );
  }
}
