import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';  
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.user$.pipe(  
      take(1),
      //map user connecter on non
      map(user => {
        if (!user) {  
          return true;
        } else {
          this.router.navigate(['/dashboard']);  
          return false;
        }
      })
    );
  }
}
