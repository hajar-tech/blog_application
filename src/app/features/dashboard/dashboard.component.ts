import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]  
})
export class DashboardComponent implements OnInit {
// Tableau pour stocker les publications à afficher 
  posts: any[] = []; 


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
   // Lors de l'initialisation du composant, deux publications fictives sont ajoutées au tableau posts.
    this.posts = [
      { title: 'Post 1', content: 'Content of Post 1', id: 1 },
      { title: 'Post 2', content: 'Content of Post 2', id: 2 }
    ];
  }

 
  editPost(postId: number) {
    console.log(`Edit post with id: ${postId}`);
  }

 
  deletePost(postId: number) {
    console.log(`Delete post with id: ${postId}`);
  }
}
