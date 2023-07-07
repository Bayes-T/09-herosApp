import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/card-hero/dialog/dialog.component';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{

  public hero?:Hero

  constructor(private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog){}

  goBack():void{
    this.router.navigateByUrl("/heros/list")
  }    

  ngOnInit(): void {
    //activated route.params me va a dar un observable, emite los parametros, y está al nivel de módulo del que se encuentra, es decir aquí en heroes los parámetros opcionales son new,search,id etc
    //OJO QUE ES UN OBSERVABLE!!, SI NO NO PODRÍA HACER NADA DE LOS PIPES Y SUBSCRIBE
    this.activatedRoute.params
    .pipe(
      //aca recibe el params y desestructuro el id
      //creo que switch map para que al buscar otro id pueda volver a escuchar el observable nuevo, si no no se si podría solo con uno, probar
      delay(1000),
      switchMap(({id}) => this.heroService.getHeroById(id)),

    ).subscribe( hero => {
      if (!hero) return this.router.navigate(['/heros/list'])
      
      return this.hero = hero 
    }
    )
  }

  //tengo el id... como era la forma clasica de hacerlo? rellenando una variable vacía y  de ahí mostrar la info?
  //ver como era en el otro componente que también hace peticiones... ahora se aprende con swtichmap 
  



}
