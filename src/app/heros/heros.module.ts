import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HerosRoutingModule } from './heros-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewHeroPageComponent } from './pages/new-hero-page/new-hero-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { CardHeroComponent } from './components/card-hero/card-hero.component';
import { imagenPipe } from './pipes/img.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/card-hero/dialog/dialog.component';



@NgModule({
  declarations: [
    LayoutPageComponent,
    HeroPageComponent,
    ListPageComponent,
    NewHeroPageComponent,
    SearchPageComponent,
    CardHeroComponent,
    imagenPipe,
    DialogComponent
  ],
  imports: [
    CommonModule,
    HerosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class HerosModule { }
