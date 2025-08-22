import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tas-form',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './tas-form.component.html',
  styleUrl: './tas-form.component.css'
})
export class TasFormComponent implements OnInit {


taskForm:FormGroup=new FormGroup({});

constructor (private service:TaskService,private fb: FormBuilder,private route:Router,private activate:ActivatedRoute){}





  ngOnInit(): void {
   
    this.taskForm=this.fb.group({

      title:['',Validators.required],
      description:['',Validators.required],
      status:['',Validators.required],
      dueDate:['',Validators.required],
      employeeId:['',Validators.required]
    })

    let id = this.activate.snapshot.paramMap.get('id');
    if (id) {
      this.service.getId(Number.parseInt(id)).subscribe({
        next: (data) => {
          this.taskForm.patchValue(data);
        }
      });
    }
  }










  onPost() {



    let id = this.activate.snapshot.paramMap.get('id');

    if (id) {
      this.service.update(Number.parseInt(id), this.taskForm.value).subscribe({
        next: (data) => {
          alert("Task updated successfully");
          this.route.navigate(['/tasklist']);
        },
        error: (error) => {
          alert("Something went wrong");
        }
      });
    }

 else{



    this.service.create(this.taskForm.value).subscribe({

      next:(data)=>{

        alert("Task created successfully");

        this.route.navigate(['/tasklist']);
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
