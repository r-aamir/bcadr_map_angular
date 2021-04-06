import { NgModule } from '@angular/core';
import { LazyNgZorroModule } from '../utils/lazy_ng_zorro.module'
import { Login } from './login/Login';
import { Home } from './home/Home';

@NgModule({
    declarations: [
        Login,
        Home
    ],
    imports: [
        LazyNgZorroModule
    ]
})


export class ViewsModule {}