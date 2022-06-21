import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl =environment.baseUrl;
  constructor(private http:HttpClient) { }

  Get(endPoint:string):Observable<any>{
    let token = localStorage.getItem('userToken')
    let header = {
      headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${token}`)
    }
    return this.http.get(`${this.baseUrl}${endPoint}`,header);
  }


  Post(endPoint:string, body: any = null):Observable<any>{
    let token = localStorage.getItem('userToken')
    let header = {
      headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${token}`)
    }
    return this.http.post(`${this.baseUrl}${endPoint}`,body,header);
  }

  Delete(endPoint:string,body:any = null):Observable<any>{
    return this.http.delete(`${this.baseUrl}${endPoint}`,body);
  }

  Put (endPoint:string,body:any = null):Observable<any>{
    return this.http.put(`${this.baseUrl}${endPoint}`,body);
  }

}
