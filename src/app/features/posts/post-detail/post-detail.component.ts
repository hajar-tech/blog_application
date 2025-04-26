import { Component, inject } from '@angular/core';
import { PostServiceService } from '../../../core/services/post-service.service';
import { Observable } from 'rxjs';
import { Article } from '../../../core/models/article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  private postService = inject(PostServiceService);

  articles$: Observable<Article[]>; // Observable des articles

  constructor() {
    this.articles$ = this.postService.getArticles();
  }

}
