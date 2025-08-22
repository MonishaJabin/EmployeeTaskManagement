import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task';
import { TaskService } from '../../service/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tas-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tas-list.component.html',
  styleUrl: './tas-list.component.css'
})
export class TasListComponent implements OnInit {


taskList:Task[]=[]

constructor(private service:TaskService){}

  ngOnInit(): void {


    this.service.getAll().subscribe({
      next:(data)=>{

        this.taskList=data
      },

        error:(er)=>{

    },

    complete:()=>{

    }

    })

  }


  onDelete(taskId: number) {

    this.service.delete(taskId).subscribe({

      next:(data)=>{
        this.ngOnInit();
      },
         error:(er)=>{

      },
      complete:()=>{
        
      }
    })

}
  

}
