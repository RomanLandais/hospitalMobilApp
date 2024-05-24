import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComServiceService } from 'src/services/com-service.service';

@Component({
  standalone: true,
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
})
export class ConsultationComponent implements OnInit {
  avisForm!: FormGroup;
  prescriptionForm!: FormGroup;
  currentDate!: string;
  endDate!: string;

  constructor(
    private fb: FormBuilder,
    private comServiceService: ComServiceService
  ) {}

  ngOnInit() {
    let date = new Date();
    date.setHours(14); // le format local ne fonctionne pas avec ionic, il faut utiliser le format ISO et adapter l'heure en fonction
    this.currentDate = date.toISOString();
    const end = new Date();
    end.setDate(end.getDate() + 3);
    this.endDate = end.toISOString();

    this.avisForm = this.fb.group({
      libelle: ['', Validators.required],
      date: [this.currentDate, Validators.required],
      description: ['', Validators.required],
      medecinNom: ['', Validators.required],
      medecinPrenom: ['', Validators.required],
    });

    this.prescriptionForm = this.fb.group({
      medicament: ['', Validators.required],
      posologie: ['', Validators.required],
      dateDebut: [this.currentDate, Validators.required],
      dateFin: [this.endDate, Validators.required],
      soigne: [false, Validators.required],
    });
  }

  onAvisSubmit() {
    if (this.avisForm.valid) {
      const avisData = this.avisForm.value;
      console.log('Avis:', avisData);
      this.comServiceService.sendData(this.avisForm.value, 'Avis').subscribe({
        next: () => {
          alert('Votre avis a été enregistrée');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    }
  }

  onPrescriptionSubmit() {
    if (this.prescriptionForm.valid) {
      const prescriptionData = this.prescriptionForm.value;
      console.log('Prescription:', prescriptionData);
      this.comServiceService
        .sendData(this.avisForm.value, 'Prescription')
        .subscribe({
          next: () => {
            alert('Votre prescription a été enregistrée');
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    }
  }
}
