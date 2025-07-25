import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupClientComponent } from './signup-client/signup-client.component';
import { SignupEmployeeComponent } from './signup-employee/signup-employee.component';
import { SignupHomeComponent } from './signup-home/signup-home.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [

    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup-home', component: SignupHomeComponent },
    { path: 'signup-employee', component: SignupEmployeeComponent},
    { path: 'signup-client', component: SignupClientComponent},
    { path: 'dashboard', component: DashboardComponent},
    

];


