import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{



  loginForm:FormGroup= new FormGroup({})

  constructor (private service:LoginService,private fb:FormBuilder,private router:Router){}

  
  ngOnInit(): void {
      this.loginForm =this.fb.group({

        name: ['',Validators.required],
        email:['',[Validators.required, Validators.email]],
  })
}


  OnLogin() {
  if (this.loginForm.valid) {
    this.service.loginPage(this.loginForm.value).subscribe({
      next: (data) => {
        if (data && data.token) {
          // ✅ Save token in sessionStorage (or localStorage)
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('employeeId', data.employeeId.toString());
          sessionStorage.setItem('name', data.name);

          // Redirect after login
          this.router.navigate(['/menu']);
        } else {
          alert("Login failed. No token returned.");
        }
      },
      error: (err) => {
        console.log(err);
        alert("Login failed. Please check your credentials.");
      }
    });
  }
}
}
