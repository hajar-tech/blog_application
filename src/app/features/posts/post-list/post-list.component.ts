import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { PostServiceService } from '../../../core/services/post-service.service';
import { response } from 'express';
import { Observable } from 'rxjs';
import { Article } from '../../../core/models/article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent  {
  searchCategory: string = '';

  private postService = inject(PostServiceService);

  articles$: Observable<Article[]>;
//inject post service pour obtenir une instance du service PostServiceService
  constructor() {
    this.articles$ = this.postService.getArticles();
  }

  onSearch(value: string) {
    //stocker les valeur dans searchCategory pour filterer apris
    this.searchCategory = value.trim().toLowerCase();
  }

 

}
