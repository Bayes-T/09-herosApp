import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap, take, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/card-hero/dialog/dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styles: [
  ]
})


export class NewHeroPageComponent  implements OnInit{

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

  constructor(
    private heroService: HeroService, 
    private ActivatedRoute:ActivatedRoute, 
    private router:Router,
    private snackbar:MatSnackBar,
    public dialog: MatDialog){}
  ngOnInit(): void {

    if(!this.router.url.includes('edit')) return

    this.ActivatedRoute.params
    .pipe(
      //con first o take(1) tbm se devuelve un observable?
      switchMap(({id}) => this.heroService.getHeroById(id))
    ).subscribe( hero => {
      if(!hero) return this.router.navigateByUrl("/")

      this.heroForm.reset(hero)
      return
    })
  }



  get currentHero():Hero{
    //trata el this.herform.value como heroe y lo regreso
    const hero = this.heroForm.value as Hero
    return hero
  }

  onSubmit():void{
    if(this.heroForm.invalid) return

    if(this.currentHero.id) {
      //porque el current hero ya tiene el herform.value, y retorna el valor hero con eso.
      this.heroService.updateHero(this.currentHero)
      //subscribe ya que el update hero es un observable... si no no hace nada!
      .subscribe(hero => {
        this.showSnackBar(`${hero.superhero} Actualizado!`)
      })
      return
    }

    //en este caso no habría nada con el id, entonces creo un nuevo
    this.heroService.addHero(this.currentHero)
    .subscribe(
      hero => {
        this.showSnackBar(`${hero.superhero} Creado!`)
        this.router.navigateByUrl(`/heroes/edit/${hero.id}`)
      }
    )

    //enviando this.heroService.updateHero(this.heroForm.value)
    //me marca error, porque herform puede tener valores nulos y Hero interface, no.
    // this.heroService.updateHero(this.heroForm.value)

    //PREGUNTA.. NUNCA LE AÑADÍ UN GENERADOR DE ID... el backend lo hace solo? o en angular material? en otras opciones era uuuid al darle nuevo generaba un string
  }

  showSnackBar(message:string):void{
    this.snackbar.open(message, 'done', {
      duration:2500,
    })
  }

  onDeleteHero():void{
    if(!this.currentHero.id)
    throw Error("Hero id is required")
    const dialogRef = this.dialog.open(DialogComponent, { data : this.heroForm.value})


    //esto es lo que pasa al hacerle click a ok borrar, lo demas pasa el en component

    //CREO QUE EL AFTERCLOSED utiliza el método del service delete, porque está suscribiéndose a un booleano que emite true o false, como el método. Y CREO QUE TOMA EL VALOR DEL DIALOGREF, PUES ESTE TOMA LA DATA DE HEROFORM Y CREO QUE ÉSTE A SU VEZ DEPENDE DE SI BORRAMOS O NO. QUÉ DEVOLVERÍA HEROFORM VALUE? QUÉ VALORES TOMA CONST DIALOGREF?

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return
      this.heroService.getHeroById(this.currentHero.id)
      .subscribe(wasDeleted =>{
        if(wasDeleted){
          this.router.navigateByUrl("/list")
        }
      }
      )
      //FALTA OPTIMIZAR SINTAXIS
    })

}}


