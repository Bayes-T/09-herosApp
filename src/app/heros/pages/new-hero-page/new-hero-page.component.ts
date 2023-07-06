import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Publisher } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: [
  ]
})
export class NewHeroPageComponent {

  public heroForm = new FormGroup(
    {
      id: new FormControl(''),
      //superhero siempre va a ser un string, no puede ser nulo, los demas si
      superhero: new FormControl('', {nonNullable: true}),
      publisher: new FormControl<Publisher>(Publisher.DCComics),
      alter_ego: new FormControl(''),
      first_appearance: new FormControl(''),
      characters: new FormControl(''),
      alt_img: new FormControl(''),
    }
  )

  public publishers = [
    {id: "DC Comics", publ: "DC - Comics"},
    {id: "Marvel Comics", publ: "Marvel - Comics"},
  ]
}
