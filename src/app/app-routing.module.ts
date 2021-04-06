import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './views/login/Login';
import { Home } from './views/home/Home';

const routes: Routes = [
    {path: '', component: Login},
    {path: 'home', component: Home},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
