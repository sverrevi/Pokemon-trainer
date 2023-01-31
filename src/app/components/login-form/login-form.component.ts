import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/trainer.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  //Dependency Injection
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService) {  }



  public loginSubmit(loginForm: NgForm): void {

    //Username
    const { username } = loginForm.value;

    this.loginService.login(username).subscribe({
      next: (trainer: Trainer) => {
        // Redirect to the catalogue page 
        this.router.navigateByUrl("/pokemon-catalogue")

      },
      error: () => {

      }

    })


  }



  //

}
