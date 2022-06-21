import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-conv',
  templateUrl: './conv.component.html',
  styleUrls: ['./conv.component.scss']
})
export class ConvComponent implements OnInit ,OnChanges{

  @Input() user!:any;
  con!:any[];

  SendForm:FormGroup = new FormGroup(
    {

      senderId:new FormControl(null,[Validators.required]),
      reciverId:new FormControl(null,[Validators.required]),
      content: new FormControl(null,[Validators.required])
    }
  ) ;


  constructor(private http : HttpService,private auth:AuthService) { }
  ngOnChanges(): void {
    // console.log(this.user) ;
    if (this.user != null) {
      this.SendForm.controls['senderId'].setValue(this.auth.user['_value'].nameid);
      this.SendForm.controls['reciverId'].setValue(this.user.id);
      this.http.Get(`/Users/GetConversation/${this.user?.id}`).subscribe(res=>{
        this.con = res
        console.log(this.con);
      })

    }
  }

  ngOnInit(): void {

  }

  Send(SendFrom:FormGroup){
    console.log(SendFrom.value);
    // this.http.Post("/Users/SendMessage",SendFrom.value).subscribe(res=>{
    //   console.log(res);
    //   SendFrom.controls['content'].setValue('');
    // })
  }

}
