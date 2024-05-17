import { Component } from '@angular/core';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  constructor(private authService: AuthService){}

  //ojo con el url, es con path relativo a donde estoy, salgo y entro de una a lsit
  //y esto se podria hacer con routerlink? es propio de primeflex o de material?
  //creo que es la forma de hacerlo de material, es similar al de ngprime
  public sidebarItems = [
    //el url tiene que ser como lo puse en el módulo de routing
    {label: "Listado", icon: "label", url: "./list"},
    {label: "Añadir", icon: "add", url: "./new"},
    {label: "Buscar", icon: "search", url: "./search"}
  ]

  get currentUser():User | undefined {
    return this.authService.currentUser
  }

  onLogout(){
    this.authService.logout()
  }
}
