import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

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
    {
        path: 'post-detail',
        component: PostDetailComponent
    }
];
