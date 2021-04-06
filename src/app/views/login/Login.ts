import {Component, NgModule, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';



@Component({
    selector: 'Login',
    templateUrl: './Login.html',
    styleUrls: ['./Login.scss']
})


export class Login implements OnInit {
    validateForm!: FormGroup;

    submitForm(): void {
        this.router.navigate(['/home']);
    }

    constructor(private fb: FormBuilder, private router: Router) {}
    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userName: ['admin', [Validators.required]],
            passWord: ['123', [Validators.required]],
        });
    }
    
}


