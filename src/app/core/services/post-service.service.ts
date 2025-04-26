import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Article } from '../models/article'; // Remets cette importation si elle existe ailleurs
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private articlesSubject = new BehaviorSubject<any[]>([]);
  articles$ = this.articlesSubject.asObservable();

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

  getArticleById(id: string): Observable<any> {
    const articleRef = doc(this.firestore, 'articles', id); // Référence à l'article dans Firestore
    return new Observable(observer => {
      getDoc(articleRef).then(docSnapshot => {
        if (docSnapshot.exists()) {
          observer.next(docSnapshot.data());
        } else {
          observer.error('Article not found');
        }
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}


