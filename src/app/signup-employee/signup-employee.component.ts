import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService, EmployeeRegistrationData } from '../services/employee.service';

@Component({
  selector: 'app-signup-employee',
  standalone:true,
  imports: [CommonModule, 
            RouterModule, 
            FormsModule, 
            ReactiveFormsModule,
            HttpClientModule
  ],
  templateUrl: './signup-employee.component.html',
  styleUrl: './signup-employee.component.css'
})
export class SignupEmployeeComponent {
  // List of Tunisian cities for the dropdown
  cities: string[] = [
    'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte',
    'Gabès', 'Ariana', 'Gafsa', 'Monastir', 'Ben Arous',
    'Kasserine', 'Médenine', 'Nabeul', 'Tataouine', 'Béja',
    'Jendouba', 'El Kef', 'Mahdia', 'Sidi Bouzid', 'Tozeur',
    'Kebili', 'Zaghouan', 'Siliana', 'Manouba',
    'Other'
  ];

  departements: string[] = [
    'Informatique',
    'Finance',
    'Resources Humaines',
    'Reseaux',
    'Risque',
    'Securite'
  ];
  

  first_name: string = '';
  last_name: string = '';
  email: string = '';
  phone_number: string = '';
  city: string = '';
  departement: string='';
  badge: string='';
  password: string = '';
  confirm_password: string = '';

  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  inputsError = {
    first_nameError: false,
    last_nameError: false,
    emailError: false,
    phoneError: false,
    cityError: false,
    departementError: false,
    badgeError: false,
    passwordError: false,
    confirm_passwordError: false
  }

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onSubmit() {
    // Reset messages
    this.successMessage = '';
    this.errorMessage = '';
    
    this.inputsError = {
      first_nameError: !this.first_name,
      last_nameError: !this.last_name,
      emailError: !this.email || !/^[a-zA-Z0-9._%+-]+@ooredoo\.tn$/.test(this.email),
      phoneError: !this.phone_number || !/^\+\d{1,4}\d{7,15}$/.test(this.phone_number),
      cityError: !this.city,
      departementError: !this.departement,
      badgeError: !this.badge || !/^BDG/.test(this.badge),
      passwordError:
        !this.password ||
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(this.password),
      confirm_passwordError: !this.confirm_password || this.password !== this.confirm_password
    };
  
    const hasError = Object.values(this.inputsError).some(error => error);
  
    if (hasError) {
      return; // stop here and show all errors
    }
  
    // All validations passed - proceed with form submission
    this.isSubmitting = true;
    
    const registrationData: EmployeeRegistrationData = {
      firstName: this.first_name,
      lastName: this.last_name,
      email: this.email,
      phoneNumber: this.phone_number,
      city: this.city,
      departement: this.departement,
      badge: this.badge,
      password: this.password,
      confirmPassword: this.confirm_password
    };

    this.employeeService.registerEmployee(registrationData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.success) {
          this.successMessage = response.message;
          // Reset form
          this.resetForm();
          // Optionally redirect to login page after 2 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Registration error:', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An error occurred during registration. Please try again.';
        }
      }
    });
  }

  private resetForm() {
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.phone_number = '';
    this.city = '';
    this.departement = '';
    this.badge = '';
    this.password = '';
    this.confirm_password = '';
    this.inputsError = {
      first_nameError: false,
      last_nameError: false,
      emailError: false,
      phoneError: false,
      cityError: false,
      departementError: false,
      badgeError: false,
      passwordError: false,
      confirm_passwordError: false
    };
  }
}
