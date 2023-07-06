import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private baseURL:string = environments.baseURL

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]>{

    return this.http.get<Hero[]>(`${this.baseURL}/heroes`)
  }

  getHeroById(id:string):Observable<Hero | undefined> {
    return this.http.get<Hero | undefined>(`${this.baseURL}/heroes/${id}`)
    .pipe(
      //error siempre debe devolver un observable, ya que el método dice que debe devolver un observable, de tipo hero o undefined.
      catchError(error => of(undefined))
    )
  }

  getSuggestions(query:string):Observable<Hero[]>{
    return this.http.get<Hero[]>(`http://localhost:3000/heroes?q=${query}&_limit=6`)
  }

  //el slash url/heroes es por la base de datos, que es heros, no heroes como en el navegador
  addHero(hero: Hero):Observable<Hero>{
    return this.http.post<Hero>(`${this.baseURL}/heroes`, hero)
  }

  updateHero(hero: Hero):Observable<Hero>{
    if (!hero.id) throw Error('El id del héroe es requerido')
    return this.http.patch<Hero>(`${this.baseURL}/${hero.id}`, hero)
  }

  //estoy borrando, no devuelve un heroe sino si se borro o no (booleano)
  deleteHero(id: string):Observable<boolean>{
    return this.http.delete(`${this.baseURL}/${id}`)
    .pipe(
      //devuelve un observable con el valor de false que quiere decir que no se borro
      catchError(error => of(false)),
      //si todo sale bien va a regresar true. Si fuera false no entraría en el map
      map( resp => true)
    )
  }
}
