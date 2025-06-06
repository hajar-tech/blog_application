import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { PostListComponent } from './features/posts/post-list/post-list.component';
import { PostDetailComponent } from './features/posts/post-detail/post-detail.component';
import { PostFormComponent } from './features/posts/post-form/post-form.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';  
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';  

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'   
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'post-list',
        component: PostListComponent
    },
    { path: 'post-detail/:id', component: PostDetailComponent
        
     },
    {
        path: 'post-form',
        component: PostFormComponent,
        canActivate: [AuthGuard] 
    },
    {
        path: 'sign-in',
        component: SignInComponent,
       
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    
];
