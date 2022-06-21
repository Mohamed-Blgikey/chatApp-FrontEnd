import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  error:string = ''
  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
  })

  constructor(private _rotue:Router,private _AuthService:AuthService) { }

  ngOnInit(): void {
  }

  login(form:FormGroup){
    // console.log(form.value);
    this._AuthService.signin(form.value).subscribe(res=>{
      // console.log(res);

      if (res.message == 'Success') {
        localStorage.setItem('userToken',res.token)
        this._AuthService.saveUserData();
        this._rotue.navigate(['/chat'])
      }
      else
      {
        this.error = res.message;
      }
    })
    // this.loginForm.reset();

  }



}
