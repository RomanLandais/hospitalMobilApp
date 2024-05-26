import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private csrfTokenKey = 'csrfToken';
  private userIdKey = 'userId';
  constructor(private http: HttpClient, private router: Router) {}

  setCsrfToken(token: string) {
    sessionStorage.setItem(this.csrfTokenKey, token); //on force le stockage en session storage sinon le token se réinitialise à chaque changement de page
  }

  getCsrfToken(): string | null {
    const token = sessionStorage.getItem(this.csrfTokenKey);
    // Vérifier si le token est présent
    if (!token) {
      // Rediriger vers la page de login
      this.router.navigate(['/home']);
      alert('Veuillez-vous authentifier svp');
      throw new Error('Veuillez-vous authentifier svp');
    }
    return token;
  }

  setUserId(userId: string) {
    sessionStorage.setItem(this.userIdKey, userId);
  }

  getUserId(): string | null {
    return sessionStorage.getItem(this.userIdKey);
  }
}
