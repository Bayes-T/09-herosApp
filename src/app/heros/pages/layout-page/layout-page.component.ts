import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {

  //ojo con el url, es con path relativo a donde estoy, salgo y entro de una a lsit
  //y esto se podria hacer con routerlink? es propio de primeflex o de material?
  //creo que es la forma de hacerlo de material, es similar al de ngprime
  public sidebarItems = [
    //el url tiene que ser como lo puse en el módulo de routing
    {label: "Listado", icon: "label", url: "./list"},
    {label: "Añadir", icon: "add", url: "./new"},
    {label: "Buscar", icon: "search", url: "./search"}
  ]
}
