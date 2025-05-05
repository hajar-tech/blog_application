import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap } from 'rxjs/operators';//manipuler les observables retournés par Firebase
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
//implement interface oninit pour demarre fonc ngOnInit() premiere fois
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userName: string | null = null;
  isMobileMenuOpen: boolean = false;
//Injection des services Firebase pour l’authentification
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.isLoggedIn = true;
          this.userName = user.displayName || user.email?.split('@')[0] || 'User';
          
          // Check if user is admin
          return this.firestore.collection('users').doc(user.uid).get().pipe(
            map(doc => {
              const data = doc.data() as any;
              console.log('User data from Firestore:', data);
              if (data && data.role === 'admin') {
                this.isAdmin = true;
                console.log('User is admin:', this.isAdmin);
              } else {
                console.log('User is not admin. Role:', data?.role);
              }
              return true;
            })
          );
        } else {
          this.isLoggedIn = false;
          this.isAdmin = false;
          this.userName = null;
          return of(false);
        }
      })
      //way permet observablle  pour envoyer les valeur
    ).subscribe();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.userName = null;
      this.isMobileMenuOpen = false;
    });
  }
}
