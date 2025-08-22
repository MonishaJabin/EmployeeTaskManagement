import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taskUrl:string =`https://localhost:7146/api/TaskManagement`


  constructor(private http :HttpClient) { }

  getAll():Observable<Task[]>
  {
    return this.http.get<Task[]>(this.taskUrl)
  }

  getId(id:number):Observable<Task>
  {
   return this.http.get<Task>(this.taskUrl+"/"+id)
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.taskUrl, task);
  }

  update(id:number,task: Task): Observable<Task> {
    return this.http.put<Task>(this.taskUrl + "/" + id, task);
  }

  delete(id:number): Observable<Task> {
    return this.http.delete<Task>(this.taskUrl + "/" + id);
  }

}
