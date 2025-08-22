import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {








  employeeform:FormGroup=new FormGroup({});

  constructor(private service:EmployeeService,private fb: FormBuilder,private route:Router,private activate:ActivatedRoute){

  }


  ngOnInit(): void {
    
    this.employeeform = this.fb.group({
      employeeId: ['',Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      joiningDate: ['', Validators.required],
    });

  let id = this.activate.snapshot.paramMap.get('id');
    if (id) {
      this.service.getEmployeeId(Number.parseInt(id)).subscribe({
        next: (data) => {
          this.employeeform.patchValue(data);
        }
      });
    }

  }




  onPost() {
let id = this.activate.snapshot.paramMap.get('id');

    if (id) {
      this.service.updateEmployee(Number.parseInt(id), this.employeeform.value).subscribe({
        next: (data) => {
          alert(" updated successfully");
          this.route.navigate(['/employee-list']);
        },
        error: (error) => {
          alert("Something went wrong");
        }
      });
    }

 else{



    this.service.createEmployee(this.employeeform.value).subscribe({

      next:(data)=>{

        alert("created successfully");

        this.route.navigate(['/employee-list']);
      },

          error:(er)=>{
             alert("something went wrong")

      },
      complete:()=>{
        
      }
    })
  }

}

}











 


  
  





