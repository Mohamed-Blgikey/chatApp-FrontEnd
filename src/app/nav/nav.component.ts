import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  islogin:boolean = true;
  isAdmin:boolean = true;
  categories:any;
  CurrentUserId = '';
  constructor(private _AuthService:AuthService) { }

  ngOnInit(): void {
    this._AuthService.user.subscribe(()=>{
      if (this._AuthService.user.getValue() == null) {
        this.islogin = false;
        this.isAdmin = false;
      }
      else{
        this.islogin = true;
        this.CurrentUserId = this._AuthService?.user['_value'].nameid;
        if (this._AuthService.user['_value']?.roles?.includes("admin") || this._AuthService.user['_value']?.roles?.includes("ADMIN")) {
          this.isAdmin = true;
        }else{
          this.isAdmin = false;
        }
        // console.log(this.CurrentUserId);
      }
    })


  }

  logOut(){
    this._AuthService.logOut();
  }

}
