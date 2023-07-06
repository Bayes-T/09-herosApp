import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { map, tap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { environments } from 'src/environments/environments';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

 public  searchInput = new FormControl('')

 //este seria el producto del observable, se podria hacer directamente en el html
 public heroes:Hero[] = [] 

 constructor(private herosService:HeroService, private Router:Router ){}

  searchHero():void{
    const value = this.searchInput.value || ""
    if(value == "") this.heroes = []

    this.herosService.getSuggestions(value)
    .subscribe(resp => {
      this.heroes = resp
    })
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent):void{
    console.log(event.option.value.id)

    this.Router.navigateByUrl(`/heros/${event.option.value.id}`)
  }
}
