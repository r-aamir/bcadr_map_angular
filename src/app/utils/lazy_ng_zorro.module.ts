import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';



@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzFormModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzFormModule
    ]
})


export class LazyNgZorroModule{}