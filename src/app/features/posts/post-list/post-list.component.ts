import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { PostServiceService } from '../../../core/services/post-service.service';
import { response } from 'express';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent  {

 constructor(){}

}
