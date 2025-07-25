import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}
  email:string='';
  password:string='';

  inputsError = {
    emailError: false,
    passwordError: false,
    
  }
  correctemail='chyrinechaar@ooredoo.tn';
  correctpassword='12345678';

  onSubmit() {
    this.inputsError = {
      emailError: !this.email || this.email!=this.correctemail,
      passwordError: !this.password || this.password!= this.correctpassword,
    
      //emailError: !this.email || !/^[a-zA-Z0-9._%+-]+@ooredoo\.tn$/.test(this.email),
      //passwordError:
       // !this.password ||
       // !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(this.password),//
    };

    if (this.inputsError.emailError == false && this.inputsError.passwordError == false){
      this.router.navigate(['/dashboard']);
    }
  
    const hasError = Object.values(this.inputsError).some(error => error);
  
    if (hasError) {
      return; 
  }}


}
