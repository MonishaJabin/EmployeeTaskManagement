import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeUrl:string =`https://localhost:7146/api/Employee`

  


  constructor(private http:HttpClient) 
  { 

  }

  getEmployee():Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.employeeUrl)
  }

  getEmployeeId(id:number):Observable<Employee>
  {
    return this.http.get<Employee>(this.employeeUrl+"/"+id)
  }

  createEmployee(employee:Employee):Observable<Employee>
  {
    return this.http.post<Employee>(this.employeeUrl,employee)
    
  }

  updateEmployee(id:number,employee:Employee):Observable<Employee>
  {
    return this.http.put<Employee>(this.employeeUrl+"/"+id,employee)
  }

 deleteEmployee(id: number): Observable<Employee>
  {

    return this.http.delete<Employee>(this.employeeUrl+"/"+id)
  
}

}
