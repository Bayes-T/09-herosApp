import { Injectable } from '@angular/core';
import { CanMatch, CanActivate, Route, UrlSegment, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router, } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class publicGuard implements CanMatch, CanActivate{

    constructor(private authService:AuthService, private router: Router) { }

    OutIfActive(): boolean | Observable<boolean> {
        return this.authService.checkAuthentication()
        .pipe(
            tap (isAuthenticated => console.log(isAuthenticated)),
            tap (isAuthenticated => {
                if(isAuthenticated) {
                    this.router.navigateByUrl("/heros/list")
                }
            }),
            //aca se invierte el comportamiento de outifactive, para que no de 404. Choca con el authguard.
            //¿primero deja entrar a la ruta y despues hace que no se pueda poner 404?
            map(isAuthenticated => !isAuthenticated)
)
    }

    canMatch(route: Route, segments: UrlSegment[]): boolean |   Observable<boolean>  {
        return this.OutIfActive()
        
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |   Observable<boolean> {
        return this.OutIfActive()
        
    }
    
}