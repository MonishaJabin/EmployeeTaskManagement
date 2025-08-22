import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { EmployeeService } from '../../service/employee.service';
import { Task } from '../../model/task';
import { Employee } from '../../model/employee';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


   tasks:Task[] = [];
  filteredTasks: Task[] = [];
  employees: Employee[] = [];

  selectedEmployee: string = '';
  selectedStatus: string = '';

  summary = { pending: 0, inProgress: 0, completed: 0 };

  constructor(
    private taskService:TaskService,
    private empService: EmployeeService
  ) {}


  

  ngOnInit(): void {
      this.loadData();
  }

   loadData() {
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
      this.calculateSummary();
    });


     this.empService.getEmployee().subscribe(data => (this.employees = data));
  }

  calculateSummary() {
    this.summary.pending = this.tasks.filter(t => t.status === 'Pending').length;
    this.summary.inProgress = this.tasks.filter(t => t.status === 'In Progress').length;
    this.summary.completed = this.tasks.filter(t => t.status === 'Completed').length;
  }

  filterTasks() {
  this.filteredTasks = this.tasks.filter(task => {
    const employeeMatch = this.selectedEmployee
      ? task.employeeId === +this.selectedEmployee   // 👈 convert string to number
      : true;

    const statusMatch = this.selectedStatus
      ? task.status === this.selectedStatus
      : true;

    return employeeMatch && statusMatch;
  });
}

    getEmployeeName(id: number): string {
    const emp = this.employees.find(e => e.employeeId === id);
    return emp ? emp.name : 'Unknown';
  }

}
