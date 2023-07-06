import { NgModule, ResolvedReflectiveFactory } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewHeroPageComponent } from './pages/new-hero-page/new-hero-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutPageComponent,
    children: [
      {path: "new", component: NewHeroPageComponent},
      {path: "search", component: SearchPageComponent},
      {path: "edit/:id", component: NewHeroPageComponent},
      {path: "list", component: ListPageComponent},
      {path: ":id", component: HeroPageComponent},
      //cualquier path no reconocido dentro de hero, me va a llevar aca, a list, incluido el hero solo, podria hacer que señale a una página de inicio mejor :)
      {path: "**", redirectTo: "list"},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HerosRoutingModule { }
