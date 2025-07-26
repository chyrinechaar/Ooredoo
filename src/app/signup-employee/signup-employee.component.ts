import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-signup-employee',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup-employee.component.html',
  styleUrls: ['./signup-employee.component.css']
})
export class SignupEmployeeComponent implements OnInit {
  cities: string[] = [
    'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte',
    'Gabès', 'Ariana', 'Gafsa', 'Monastir', 'Ben Arous',
    'Kasserine', 'Médenine', 'Nabeul', 'Tataouine', 'Béja',
    'Jendouba', 'El Kef', 'Mahdia', 'Sidi Bouzid', 'Tozeur',
    'Kebili', 'Zaghouan', 'Siliana', 'Manouba', 'Other'
  ];

  departements: string[] = [
    'Informatique', 'Finance', 'Resources Humaines', 'Reseaux', 'Risque', 'Securite'
  ];

  signupForm!: FormGroup;
  inputsError = {
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    phoneError: false,
    cityError: false,
    departementError: false,
    badgeError: false,
    passwordError: false,
    confirmPasswordError: false
  };

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@ooredoo\.tn$')]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+\\d{1,4}\\d{7,15}$')]],
      city: ['', [Validators.required]],
      departement: ['', [Validators.required]],
      badge: ['', [Validators.required, Validators.pattern('^BDG.*$')]], // Updated pattern
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$')]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    // Real-time validation feedback
    this.signupForm.valueChanges.subscribe(() => {
      this.updateErrorState();
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  updateErrorState() {
    const badgeControl = this.signupForm.get('badge');
    console.log('Badge value:', badgeControl?.value, 'Valid:', badgeControl?.valid, 'Errors:', badgeControl?.errors);

    this.inputsError = {
      firstNameError: !!this.signupForm.get('firstName')?.touched && !!this.signupForm.get('firstName')?.hasError('required'),
      lastNameError: !!this.signupForm.get('lastName')?.touched && !!this.signupForm.get('lastName')?.hasError('required'),
      emailError: !!this.signupForm.get('email')?.touched && (!!this.signupForm.get('email')?.hasError('required') || !!this.signupForm.get('email')?.hasError('pattern')),
      phoneError: !!this.signupForm.get('phoneNumber')?.touched && (!!this.signupForm.get('phoneNumber')?.hasError('required') || !!this.signupForm.get('phoneNumber')?.hasError('pattern')),
      cityError: !!this.signupForm.get('city')?.touched && !!this.signupForm.get('city')?.hasError('required'),
      departementError: !!this.signupForm.get('departement')?.touched && !!this.signupForm.get('departement')?.hasError('required'),
      badgeError: !!this.signupForm.get('badge')?.touched && (!!this.signupForm.get('badge')?.hasError('required') || !!this.signupForm.get('badge')?.hasError('pattern')),
      passwordError: !!this.signupForm.get('password')?.touched && (!!this.signupForm.get('password')?.hasError('required') || !!this.signupForm.get('password')?.hasError('pattern')),
      confirmPasswordError: !!this.signupForm.get('confirmPassword')?.touched && (!!this.signupForm.get('confirmPassword')?.hasError('required') || this.signupForm.hasError('mismatch'))
    };
    console.log('Form errors:', this.inputsError);
  }

  onSubmit() {
    console.log('Form submitted. Valid:', this.signupForm.valid);
    console.log('Form value:', this.signupForm.value);
    console.log('Form errors:', this.signupForm.errors);

    // Force validation errors to show
    this.signupForm.markAllAsTouched();
    this.updateErrorState();

    if (this.signupForm.invalid) {
      console.log('Form invalid. Errors:', this.inputsError);
      alert('Please fix the form errors before submitting. Check badge format (e.g., BDG4567).');
      return;
    }

    const employee: Employee = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      phoneNumber: this.signupForm.value.phoneNumber,
      city: this.signupForm.value.city,
      departement: this.signupForm.value.departement,
      badge: this.signupForm.value.badge,
      password: this.signupForm.value.password
    };

    console.log('Sending employee data:', employee);

    this.employeeService.saveEmployee(employee).subscribe({
      next: (response) => {
        console.log('Employee registered:', response);
        this.signupForm.reset();
        alert('Registration successful! Redirecting to login...');
        this.router.navigate(['/login']).catch(err => {
          console.error('Navigation error:', err);
          alert('Redirect failed. Please navigate to login manually.');
        });
      },
      error: (err) => {
        console.error('Registration error:', err);
        let errorMessage = 'Registration failed. Please try again.';
        if (err.status === 400) {
          errorMessage = 'Invalid data. Please check all fields (e.g., email, badge).';
        } else if (err.status === 0) {
          errorMessage = 'Cannot connect to backend. Ensure http://localhost:8080 is running.';
        } else if (err.status === 403 || err.status === 405) {
          errorMessage = 'CORS or method issue. Check backend CORS settings.';
        }
        alert(errorMessage);
      }
    });
  }
}