import { Component, inject, OnInit } from '@angular/core';
import { PostServiceService } from '../../../core/services/post-service.service';
import { Observable } from 'rxjs';
import { Article } from '../../../core/models/article';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit{
  article: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostServiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getArticleById(id).subscribe(data => {
        this.article = data;
      });
    }
  }


}
