import { Component, inject } from '@angular/core';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  auth = inject(Auth);
  router = inject(Router);

  form!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor() {
    //where compo work in first time add new form 
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
//On vérifie d'abord que le formulaire est valide ou non
  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
//Si l’e-mail existe, Firebase envoie un lien de réinitialisation à l’utilisateur.
    sendPasswordResetEmail(this.auth, this.form.value.email)
      .then(() => {
        this.successMessage = "A password reset link has been sent to your email.";
        this.isLoading = false;
      })
      .catch(error => {
 //else on affiche un message d’erreur.
        this.errorMessage = "An error occurred, please try again.";
        this.isLoading = false;
      });
  }
}
