import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    hidePassword = true
    onHidePassword() {
        this.hidePassword = false
    }
    loginForm = new FormGroup(
        {
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        },
        Validators.required
    )
    constructor() {}

    ngOnInit(): void {}
}
