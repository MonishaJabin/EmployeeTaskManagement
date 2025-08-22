import { Routes } from '@angular/router';
import { LoginComponent } from './compontent/login/login.component';
import { HomeComponent } from './compontent/home/home.component';
import { EmployeeListComponent } from './compontent/employee-list/employee-list.component';
import { EmployeeFormComponent } from './compontent/employee-form/employee-form.component';
import { TasListComponent } from './compontent/tas-list/tas-list.component';
import { TasFormComponent } from './compontent/tas-form/tas-form.component';
import { DashboardComponent } from './compontent/dashboard/dashboard.component';
import { EmployeeComponent } from './Home/employee/employee.component';
import { TaskComponent } from './Home/task/task.component';
import { MenubarComponent } from './compontent/menubar/menubar.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'employee-list',component:EmployeeListComponent},
    {path:'employee-details/:id',component:EmployeeFormComponent},
    {path:'employee-post',component:EmployeeFormComponent},
    {path:'tasklist',component:TasListComponent},
    {path:'taskform',component:TasFormComponent},
    {path:'taskfor/:id',component:TasFormComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'employee',component:EmployeeComponent},
    {path:'task',component:TaskComponent},
    {path:'menu',component:MenubarComponent}
];
