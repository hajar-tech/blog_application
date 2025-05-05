import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Article } from '../models/article'; 
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  private articlesSubject = new BehaviorSubject<any[]>([]);
  articles$ = this.articlesSubject.asObservable();

  private firestore = inject(Firestore);

  addArticle(article: Article): Promise<void> {
    const id = crypto.randomUUID(); //  crypto.randomUUID() permet Génère un ID unique 
    article.id = id;
    const articleRef = doc(this.firestore, 'articles', id);
    return setDoc(articleRef, article);//return article  qui stocker dans setDoc 
  }


  getArticles(): Observable<Article[]> {
    const articlesCollection = collection(this.firestore, 'articles');
    return collectionData(articlesCollection, { idField: 'id' }) as Observable<Article[]>;
  }

  getArticleById(id: string): Observable<any> {
    const articleRef = doc(this.firestore, 'articles', id); // Référence à l'article dans Firestore
    return new Observable(observer => {
      //get just un article
      getDoc(articleRef).then(docSnapshot => {
        
        if (docSnapshot.exists()) {
          //docSnapshot return data article from firestore
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


