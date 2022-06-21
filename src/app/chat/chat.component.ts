import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  userName!:string;
  users!:any[];
  user!:any;
  constructor(private auth :AuthService,private http:HttpService) { }

  ngOnInit(): void {
    this.userName = this.auth.user['_value'].fullName
    // console.log(this.auth.user.getValue());
    this.http.Get("/Users/GetAll").subscribe(res=>{
      // console.log(res);
      this.users = res.data;
      this.user = this.users[0];
    })
  }

  Caht(user:any){
    this.user = user;
  }

}
