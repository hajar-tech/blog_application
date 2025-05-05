import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Définir l'interface pour l'utilisateur
interface User {
  role?: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  currentUser$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
     //affiche situ de utulisateur 
    this.currentUser$ = this.afAuth.authState;
  }

  // Vérifier si l'utilisateur est admin
  isAdmin$(): Observable<boolean> {
    return this.currentUser$.pipe(
      switchMap(user => {
        if (!user) return of(false);
        
        // Get user document from Firestore with role information
        return this.firestore.collection('users').doc(user.uid).get().pipe(
          map(doc => {
            const userData = doc.data() as User;
            return userData?.role === 'admin';
          }),
          catchError(() => of(false))
        );
      })
    );
  }
}
