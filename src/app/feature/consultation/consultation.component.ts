import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComServiceService } from 'src/services/com-service.service';
import { ServicesModule } from 'src/services/services.module';

@Component({
  standalone: true,
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    ServicesModule,
    FormsModule,
  ],
})
export class ConsultationComponent implements OnInit {
  avisForm!: FormGroup;
  prescriptionForm!: FormGroup;
  currentDate!: string;
  endDate!: string;
  nomsPatients: { id: number; displayName: string }[] = [];
  nomsDoctors: { id: number; displayName: string }[] = [];
  dateStay: { id: number; displayDate: string; id_user: number }[] = [];
  idUser!: number;
  idDoctor!: number;
  idStay!: number;

  constructor(
    private fb: FormBuilder,
    private comServiceService: ComServiceService
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadDoctors();
    this.loadStay();

    let date = new Date();
    date.setHours(14); // le format local ne fonctionne pas avec ionic, il faut utiliser le format ISO et adapter l'heure en fonction
    this.currentDate = date.toISOString();
    const end = new Date();
    end.setDate(end.getDate() + 3);
    this.endDate = end.toISOString();

    this.avisForm = this.fb.group({
      titre: ['', Validators.required],
      date: [this.currentDate, Validators.required],
      description: ['', Validators.required],
    });

    this.prescriptionForm = this.fb.group({
      medicament: ['', Validators.required],
      posologie: ['', Validators.required],
      dateDebut: [this.currentDate, Validators.required],
      dateFin: [this.endDate, Validators.required],
      soigne: [false, Validators.required],
    });
  }

  loadUser(): void {
    this.comServiceService.getData('loadUsers').subscribe((data: any) => {
      if (data.users && Array.isArray(data.users)) {
        this.nomsPatients = data.users.map((user: any) => ({
          id: user.id_user,
          displayName: `${user.last_name} ${user.name}`,
        }));
      } else {
        console.error(
          'Invalid data format: user property is missing or not an array'
        );
      }
    });
  }

  loadStay(): void {
    this.comServiceService.getData('loadStay').subscribe((data: any) => {
      if (data.users && Array.isArray(data.users)) {
        this.dateStay = data.users
          .filter((user: any) => user.id_user === this.idUser)
          .map((user: any) => ({
            id: user.id_stay,
            displayDate: user.start_date,
            id_user: user.id_user,
          }));
      } else {
        console.error(
          'Invalid data format: stay property is missing or not an array',
          data
        );
      }
    });
  }

  // Charger les séjours pour l'utilisateur sélectionné
  onUserChange(): void {
    if (this.idUser) {
      this.loadStay();
    }
  }

  loadDoctors(): void {
    this.comServiceService.getData('loadDoctors').subscribe((data: any) => {
      if (data.doctors && Array.isArray(data.doctors)) {
        this.nomsDoctors = data.doctors.map((doctor: any) => ({
          id: doctor.id_doctor,
          displayName: `${doctor.last_name} ${doctor.name}`,
        }));
      } else {
        console.error(
          'Invalid data format: doctors property is missing or not an array'
        );
      }
    });
  }

  onAvisSubmit() {
    if (this.avisForm.valid) {
      const avisData = this.avisForm.value;
      avisData['idUser'] = this.idUser;
      avisData['idDoctor'] = this.idDoctor;
      avisData['idStay'] = this.idStay;
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
      prescriptionData['idUser'] = this.idUser;
      prescriptionData['idDoctor'] = this.idDoctor;
      prescriptionData['idStay'] = this.idStay;
      this.comServiceService
        .sendData(this.prescriptionForm.value, 'Prescription')
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
