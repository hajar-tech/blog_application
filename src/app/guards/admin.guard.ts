import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, take, switchMap, catchError } from 'rxjs/operators';

interface UserData {
  role?: string;
  username?: string;
  email?: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/sign-in']);
          return of(false);
        }
        
        // Check if user has admin role in Firestore
        return this.firestore.collection('users').doc(user.uid).get().pipe(
          map(doc => {
            const data = doc.data() as UserData;
            const isAdmin = data && data.role === 'admin';
            
            if (!isAdmin) {
              this.router.navigate(['/']);
              return false;
            }
            
            return true;
          }),
          catchError(() => {
            this.router.navigate(['/']);
            return of(false);
          })
        );
      })
    );
  }
}
