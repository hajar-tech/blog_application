import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Article } from '../models/article'; // Remets cette importation si elle existe ailleurs
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private firestore = inject(Firestore);

  addArticle(article: Article): Promise<void> {
    const id = crypto.randomUUID(); // Génère un ID unique
    article.id = id;
    const articleRef = doc(this.firestore, 'articles', id);
    return setDoc(articleRef, article);
  }


  getArticles(): Observable<Article[]> {
    const articlesCollection = collection(this.firestore, 'articles');
    return collectionData(articlesCollection, { idField: 'id' }) as Observable<Article[]>;
  }
}


