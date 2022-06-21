import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  error:string = ''
  file:any;
  fileName:string = '';

  signUpForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    fullName:new FormControl(null,[Validators.required])
  })
  constructor(private _rotue:Router,private _AuthService:AuthService) { }

  ngOnInit(): void {
  }

  signUp(form:FormGroup){

    // console.log(data);


    this._AuthService.signUp(form.value ).subscribe(res=>{
      // console.log(res);

      if (res.message == 'Success') {
        this._rotue.navigate(['/signin'])
      }
      else
      {
        this.error = res.message;
      }
    })

  }



}
