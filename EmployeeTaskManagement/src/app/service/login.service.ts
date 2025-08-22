import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, LoginResponse } from '../model/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


 loginUrl:string=`https://localhost:7146/api/Login`



  constructor(private http:HttpClient) { }

  loginPage(login:Login):Observable<LoginResponse>
  {
    return this .http.post<LoginResponse>(this.loginUrl,login)
  }
}
