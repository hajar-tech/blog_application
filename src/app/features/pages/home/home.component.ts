import { Component } from '@angular/core';
import { PostListComponent } from '../../posts/post-list/post-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
