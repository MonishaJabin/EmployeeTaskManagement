import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../service/employee.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit{



onDelete(employeeId: number) {

  this.service.deleteEmployee(employeeId).subscribe({

    next:(data)=>{
      this.ngOnInit();
    },
    error:(er)=>{
      alert("something went wrong")
    }
  })
}

onEdit(employeeId: number) {
  // Navigate to the edit page with the selected employee ID
  this.router.navigate(['/employee-details', employeeId]);
}

 employeeList: Employee[] = [];


 constructor(private service:EmployeeService,private router:Router){}

  ngOnInit(): void {
    
    this.service.getEmployee().subscribe({

      next:(data)=>{
        this.employeeList=data
      },
       error:(er)=>{

    },

    complete:()=>{

    }
    })
  }


}



