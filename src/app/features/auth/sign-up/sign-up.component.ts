
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ // Modules nécessaires pour le composant
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  // Déclaration des variables
  authForm: FormGroup;
  isSubmissionInProgress = false; 
  errorMessage: string | null = null; 
  showPassword = false; 

  // Injection des services nécessaires
  private auth = inject(Auth);
  private firestore = inject(Firestore); 
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
// Création du formulaire avec les champs requis
    this.authForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  // Soumission du formulaire
  onSubmit() {
    // Si le formulaire est invalide, on ne fait rien
    if (this.authForm.invalid) return;

    this.isSubmissionInProgress = true;
    this.errorMessage = null;

    const { email, password, username } = this.authForm.value;

    // Création d'un compte utilisateur avec Firebase Auth
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        console.log('Utilisateur créé :', userCredential.user);

      
        try {
          await setDoc(doc(this.firestore, 'users', userCredential.user.uid), {
            username: username,
            email: email,
            role: 'user',
            createdAt: new Date()
          });

          // Redirection vers la page de connexion après succès
          this.isSubmissionInProgress = false;
          this.router.navigate(['/sign-in']);
        } catch (error) {
          // En cas d'erreur lors de l'enregistrement Firestore
          console.error('Erreur Firestore :', error);
          this.errorMessage = 'Compte créé mais échec de la configuration du profil.';
          this.isSubmissionInProgress = false;
        }
      })
      .catch((error) => {
        // Gestion des erreurs d'inscription Firebase
        this.isSubmissionInProgress = false;
        console.error('Erreur d’inscription :', error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorMessage = 'Cet email est déjà utilisé.';
            break;
          case 'auth/weak-password':
            this.errorMessage = 'Veuillez choisir un mot de passe plus fort.';
            break;
          default:
            this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
            break;
        }
      });
  }

  // Connexion avec Google
  onSignInWithGoogle() {
    this.isSubmissionInProgress = true;
    this.errorMessage = null;

    const provider = new GoogleAuthProvider();

    // Authentification via pop-up Google
    signInWithPopup(this.auth, provider)
      .then(async (result) => {
        console.log('Connexion Google réussie :', result.user);

        // Enregistrement de l'utilisateur dans Firestore (ou mise à jour s’il existe)
        try {
          await setDoc(doc(this.firestore, 'users', result.user.uid), {
            username: result.user.displayName || 'Utilisateur Google',
            email: result.user.email,
            role: 'user',
            createdAt: new Date()
          }, { merge: true }); // merge:true pour éviter d’écraser les données existantes

          this.isSubmissionInProgress = false;
          this.router.navigate(['/home']); // Redirection vers la page d’accueil
        } catch (error) {
          console.error('Erreur Firestore avec Google :', error);
          this.isSubmissionInProgress = false;
          this.errorMessage = 'Connexion réussie mais échec de la configuration du profil.';
        }
      })
      .catch((error) => {
        // Erreur lors de l'authentification Google
        this.isSubmissionInProgress = false;
        console.error('Erreur Google :', error);
        this.errorMessage = 'La connexion avec Google a échoué.';
      });
  }

  // Permet d'afficher ou masquer le mot de passe
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
