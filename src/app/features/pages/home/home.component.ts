import { Component } from '@angular/core';
import { PostListComponent } from '../../posts/post-list/post-list.component';
import { RouterLink } from '@angular/router';
import { PostDetailComponent } from '../../posts/post-detail/post-detail.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink,PostDetailComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  nomParent='salma';
}
