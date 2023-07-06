import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-card-hero',
  templateUrl: './card-hero.component.html',
  styleUrls: ['./card-hero.component.css']
})
export class CardHeroComponent implements OnInit{
  ngOnInit(): void {
    if(!this.hero) throw new Error('Hero property is required');
  }

  @Input()
  public hero!:Hero  
}
