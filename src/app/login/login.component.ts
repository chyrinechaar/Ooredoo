import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  inputsError = {
    emailError: false,
    passwordError: false,
    termsError: false
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@ooredoo\.tn$')]],
      password: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    });

    // Real-time validation feedback
    this.loginForm.valueChanges.subscribe(() => {
      this.updateErrorState();
    });
  }

  updateErrorState() {
    this.inputsError = {
      emailError: !!this.loginForm.get('email')?.touched && (!!this.loginForm.get('email')?.hasError('required') || !!this.loginForm.get('email')?.hasError('pattern')),
      passwordError: !!this.loginForm.get('password')?.touched && !!this.loginForm.get('password')?.hasError('required'),
      termsError: !!this.loginForm.get('terms')?.touched && !!this.loginForm.get('terms')?.hasError('required')
    };
    console.log('Login form errors:', this.inputsError);
  }

  onSubmit() {
    console.log('Login form submitted. Valid:', this.loginForm.valid);
    console.log('Form value:', this.loginForm.value);

    this.loginForm.markAllAsTouched();
    this.updateErrorState();

    if (this.loginForm.invalid) {
      console.log('Login form invalid. Errors:', this.inputsError);
      alert('Please fix the form errors before submitting.');
      return;
    }

    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log('Sending login data:', loginData);

    this.loginService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        this.loginForm.reset();
        alert('Login successful! Redirecting to dashboard...');
        this.router.navigate(['/dashboard']).catch(err => {
          console.error('Navigation error:', err);
          alert('Redirect failed. Please navigate to dashboard manually.');
        });
      },
      error: (err) => {
        console.error('Login error:', err);
        let errorMessage = 'Login failed. Please try again.';
        if (err.status === 401) {
          errorMessage = 'Invalid email or password.';
        } else if (err.status === 0) {
          errorMessage = 'Cannot connect to backend. Ensure http://localhost:8080 is running.';
        }
        alert(errorMessage);
      }
    });
  }
}