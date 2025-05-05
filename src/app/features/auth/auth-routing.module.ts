import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NoAuthGuard } from '../../guards/no-auth.guard'; 

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    canActivate: [NoAuthGuard]  // ajouter NoAuthGuard 
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [NoAuthGuard]  
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NoAuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
