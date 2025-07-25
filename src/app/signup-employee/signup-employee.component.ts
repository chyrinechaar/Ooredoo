import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup-employee',
  standalone:true,
  imports: [CommonModule, 
            RouterModule, 
            FormsModule, 
            ReactiveFormsModule
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


  onSubmit() {
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
  
    // 👉 All validations passed - proceed with form submission
    // ... call your service here
  }

}
