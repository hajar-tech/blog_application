
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-in',
  standalone: true, 
  imports: [
    ReactiveFormsModule, 
    MatIconModule, 
    MatProgressSpinnerModule, 
    CommonModule,
    RouterModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  // Déclaration du formulaire
  authForm: FormGroup;

  isSubmissionInProgress = false; 
  errorMessage: string | null = null; 
  showPassword = false; 

  // Injecte les services nécessaires
  private auth = inject(Auth);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Dictionnaire de messages d’erreur Firebase personnalisés
  private errorMessages: { [key: string]: string } = {
    'auth/invalid-email': 'The email address is not valid.',
    'auth/user-not-found': 'No user found with this email address.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/too-many-requests': 'Too many login attempts. Please try again later.',
  };

  constructor() {
    // Initialisation du formulaire avec les validateurs
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Fonction appelée à la soumission du formulaire
  onSubmit() {
    if (this.authForm.invalid) return; 

    // Active le spinner 
    this.isSubmissionInProgress = true;
    this.errorMessage = null;

    const { email, password } = this.authForm.value;

    // Connexion avec email et mot de passe
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user);

        // Vérifie si l'email est vérifié
        if (!userCredential.user.emailVerified) {
          this.errorMessage = 'Please verify your email address before signing in.';
          this.isSubmissionInProgress = false;
          return;
        }

        // Redirection vers la page d'accueil si tout est bon
        this.isSubmissionInProgress = false;
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        // Arrêt du spinner
        this.isSubmissionInProgress = false;

        console.error('Sign-in error:', error);

        // Affiche le message d’erreur selon le code retourné
        this.errorMessage = this.errorMessages[error.code] || 'An unexpected error occurred. Please try again.';
      });
  }

  // Fonction de connexion avec Google
  onSignInWithGoogle() {
    this.isSubmissionInProgress = true;
    this.errorMessage = null;

    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('Google sign in successful:', result.user);
        this.isSubmissionInProgress = false;
        this.router.navigate(['/home']); // Redirection après succès
      })
      .catch((error) => {
        this.isSubmissionInProgress = false;
        console.error('Google sign in error:', error);
        this.errorMessage = 'Google sign in failed. Please try again.';
      });
  }

  // Fonction pour afficher ou masquer le mot de passe
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
