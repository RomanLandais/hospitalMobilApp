import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComServiceService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  /* --------------------------------------------------------------------------------------------------------------------------------
  Fonction pour envoyer des données au serveur lors de la connexion
  -------------------------------------------------------------------------------------------------------------------------------- */
  sendDataLogin(data: any, endpoint: string) {
    // Concaténez l'endpoint fourni à l'URL de base
    const url = `https://localhost:3000/api/hospital/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(url, data, { headers });
  }

  /* --------------------------------------------------------------------------------------------------------------------------------
  Fonction pour envoyer des données au serveur
  -------------------------------------------------------------------------------------------------------------------------------- */
  sendData(data: any, endpoint: string) {
    const url = `https://localhost:3000/api/hospital/${endpoint}`;
    const authToken = this.tokenService.getCsrfToken();

    const userId = this.tokenService.getUserId() || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      'X-User-Id': userId,
    });
    headers.keys().forEach((name) => {});

    return this.http.post<any>(url, data, { headers });
  }

  /* --------------------------------------------------------------------------------------------------------------------------------
  Fonction pour récupérer des données depuis le serveur
  -------------------------------------------------------------------------------------------------------------------------------- */
  getData(endpoint: string): Observable<any> {
    const url = `https://localhost:3000/api/hospital/${endpoint}`;
    const authToken = this.tokenService.getCsrfToken();

    const userId = this.tokenService.getUserId() || '';

    // Ajouter les headers avec le token d'authentification et userId
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
      'X-User-Id': userId,
    });

    // Effectuer la requête HTTP GET avec les headers
    return this.http.get<any>(url, { headers }).pipe(
      tap((data) => {}),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return throwError(() => error);
      })
    );
  }
}
