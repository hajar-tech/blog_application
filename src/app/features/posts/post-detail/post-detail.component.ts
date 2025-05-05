import { Component, inject, Input, OnInit } from '@angular/core';
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
  
 @Input ()nom!:string;

  article: any;
//
  constructor(
    //id dans url
    private route: ActivatedRoute,
    private postService: PostServiceService
  ) {}

  ngOnInit(): void {
    //récupère l’ID de l’article dans l’URL (paramMap.get('id')).
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      //si id exit On utilise la méthode getArticleById(id)pour récupérer les données.
      this.postService.getArticleById(id).subscribe(data => {
        //permet de recevoir la réponse et de la stocker dans this.article.
        this.article = data;
      });
    }
  }


}
