import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder, private loginService: LoginService, private authService: AuthService) { }

  loginInvalid: boolean = false;

  formLogin = this.fb.group({
    nick: ['', Validators.required],
    password: ['', Validators.required]
  })

  clickLogin() {
    if (this.formLogin.valid) {
      console.log(this.authService.isLogued());
      this.loginService.login(this.formLogin.value).subscribe(resp => {
        if (resp.estado == 'success') {
          localStorage.setItem('token', resp.token)
          this.authService.authenticate();
          this.loginInvalid = false;
        } else {
          this.loginInvalid = true;
        }
      });
    }
  }

  hide: boolean = true;

  ngOnInit(): void {
  }

}
