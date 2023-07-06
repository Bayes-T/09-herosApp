import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes:Routes = [
    {
        //por que el basico es auth/..? donde lo aclaro? por el nombre de modulo?
        path: "",
        component: LayoutPageComponent,
        children: [
            {path:"login", component: LoginPageComponent},
            {path:"register", component: RegisterPageComponent},
            {path:"**", redirectTo: "login"}
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [],
})
export class AuthRoutingModule { }
