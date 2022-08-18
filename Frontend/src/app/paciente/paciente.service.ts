import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Paciente } from './paciente';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiURL = 'http://localhost:3678/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Paciente[]> {
    return this.httpClient
      .get<Paciente[]>(this.apiURL + '/pacientes/')
      .pipe(catchError(this.errorHandler));
  }

  create(paciente: Paciente): Observable<Paciente> {
    return this.httpClient
      .post<Paciente>(
        this.apiURL + '/pacientes/',
        JSON.stringify(paciente),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  find(id: string): Observable<Paciente> {
    return this.httpClient
      .get<Paciente>(this.apiURL + '/pacientes/' + id)
      .pipe(catchError(this.errorHandler));
  }

  update(id: string, paciente: Paciente): Observable<Paciente> {
    return this.httpClient
      .put<Paciente>(
        this.apiURL + '/pacientes/' + id,
        JSON.stringify(paciente),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: string) {
    return this.httpClient
      .delete<Paciente>(this.apiURL + '/pacientes/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
