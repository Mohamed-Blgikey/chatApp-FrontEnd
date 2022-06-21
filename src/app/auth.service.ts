import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private _Router: Router,
    private http: HttpClient,
    private router: Router
  ) {
    if (localStorage.getItem('userToken')) {
      this.saveUserData();
      // console.log(this.user.getValue());

    }
  }
  signin(obj: any): Observable<any> {
    return this.http.post(environment.baseUrl +'/Login', obj);
  }

  signUp(obj: any): Observable<any> {
    return this.http.post(environment.baseUrl + "/Register", obj);
  }
  saveUserData() {
    let token: any = localStorage.getItem('userToken');
    this.user.next(jwtDecode(token));
    // console.log(this.user.getValue());
  }


  logOut() {
    this.user.next(null);
    localStorage.removeItem('userToken');
    this._Router.navigate(['/signin']);
  }
}
