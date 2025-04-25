import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Article } from '../../../core/models/article';
import { PostServiceService } from '../../../core/services/post-service.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

  private postService = inject(PostServiceService);

  formular = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    writerName: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    image: new FormControl('')
  });

  async onSubmit() {
    if (this.formular.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    const articleData = this.formular.value as Article;

    try {
      await this.postService.addArticle(articleData);
      alert('Article successfully published!');
      this.formular.reset();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  }
}
