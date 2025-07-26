import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup-client',
  imports: [ FormsModule, CommonModule, RouterModule],
  templateUrl: './signup-client.component.html',
  styleUrl: './signup-client.component.css'
})
export class SignupClientComponent {

  first_name = '';
  last_name = '';
  email = '';
  phone_number = '';
  country = '';
  city = '';
  password = '';
  confirm_password = '';

  countries: string[] = [
    'Tunisia', 'Algeria', 'Morocco', 'Egypt', 'France', 
    'Germany', 'Italy', 'Spain', 'United Kingdom', 'United States', 
    'Canada', 'Other'
  ];

  cities: string[] = [
    'Tunis', 'Sfax', 'Sousse', 'Kairouan', 'Bizerte',
    'Gabès', 'Ariana', 'Gafsa', 'Monastir', 'Ben Arous',
    'Kasserine', 'Médenine', 'Nabeul', 'Tataouine', 'Béja',
    'Jendouba', 'El Kef', 'Mahdia', 'Sidi Bouzid', 'Tozeur',
    'Kebili', 'Zaghouan', 'Siliana', 'Manouba',
    'Other'
  ];





}
