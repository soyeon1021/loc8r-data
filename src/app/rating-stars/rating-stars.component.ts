import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.css']
})
export class RatingStarsComponent {
  @Input() rating: number = 0;

  constructor() {}

  ngOnInit(): void{

  }

}
