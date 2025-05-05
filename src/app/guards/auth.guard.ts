import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => {
        if (user) {
          // L'utilisateur est connecté, autoriser l'accès
          return true;
        } else {
          // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
          this.router.navigate(['/sign-in']);
          return false;
        }
      })
    );
  }
} 