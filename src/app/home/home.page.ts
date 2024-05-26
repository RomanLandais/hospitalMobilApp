import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Validators } from '@angular/forms';
import { ComServiceService } from '../../services/com-service.service';
import { TokenService } from '../../services/token.service';
import { CommonModule } from '@angular/common';
import { ServicesModule } from 'src/services/services.module';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ServicesModule, IonicModule],
})
export class HomePage implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private comServerService: ComServiceService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSignInSubmit() {
    this.comServerService
      .sendDataLogin(this.signInForm.value, 'signInMobil')
      .subscribe({
        next: (response) => {
          // Extraire le token CSRF de la réponse et le stocker dans le service
          const token = response.token;
          this.tokenService.setCsrfToken(token);

          // Récupérer l'identifiant de l'utilisateur depuis la réponse et le stocker dans le service
          const userId = response.userId;
          this.tokenService.setUserId(userId);

          // Rediriger vers le composant ConsultationComponent après une connexion réussie

          this.router.navigate(['/consultation']);
        },

        error: (error) => {
          console.error('Error:', error);
          if (error.status === 401) {
            if (
              error.error &&
              error.error.error ===
                'Accès refusé. Seuls les médecins peuvent se connecter.'
            ) {
              alert('Accès refusé. Seuls les médecins peuvent se connecter.');
            } else {
              alert(
                'Utilisateur non trouvé ou mot de passe incorrect. Veuillez réessayer.'
              );
            }
          } else {
            if (error.error) {
              console.error('Error details:', error.error);
            }
          }
        },
        complete: () => alert('Connecté avec succès'),
      });
  }
}
