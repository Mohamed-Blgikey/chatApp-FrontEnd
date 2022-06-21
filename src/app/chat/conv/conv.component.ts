import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HubConnection } from '@aspnet/signalr';
import * as signalr from '@aspnet/signalr'
import { AuthService } from 'src/app/auth.service';
import { HttpService } from 'src/app/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conv',
  templateUrl: './conv.component.html',
  styleUrls: ['./conv.component.scss']
})
export class ConvComponent implements OnInit ,OnChanges,AfterViewChecked{

  @ViewChild('panel') panel!:ElementRef;
  @Input() user!:any;
  con!:any[];
  private HubConnection!:HubConnection;

  SendForm:FormGroup = new FormGroup(
    {

      senderId:new FormControl(null,[Validators.required]),
      reciverId:new FormControl(null,[Validators.required]),
      content: new FormControl(null,[Validators.required])
    }
  ) ;


  constructor(private http : HttpService,private auth:AuthService) { }
  ngAfterViewChecked(): void {

    this.panel.nativeElement.scrollTop = this.panel?.nativeElement.scrollHeight;
  }
  ngOnChanges(): void {
    // console.log(this.user) ;
    if (this.user != null) {
      this.SendForm.controls['senderId'].setValue(this.auth.user['_value'].nameid);
      this.SendForm.controls['reciverId'].setValue(this.user.id);
      this.http.Get(`/Users/GetConversation/${this.user?.id}`).subscribe(res=>{
        this.con = res
        // console.log(this.con);
      })

    }
  }

  ngOnInit(): void {
    this.HubConnection = new signalr.HubConnectionBuilder().withUrl(`${environment.baseUrl}/Notify`).build();
    this.HubConnection
    .start().then(()=>{
      console.log("Start");
    }).catch((err)=>{
      console.log(err);
    })
    this.HubConnection
    .onclose(()=>{
      setTimeout(() => {
        console.log("Restart");
        this.HubConnection
    .start().then(()=>{
      console.log("Start");
    }).catch((err)=>{
      console.log(err);
    })
      }, 5000);
    })


    this.HubConnection.on("ReciveMessage",((data:any)=>{
      if (this.auth.user['_value'].nameid == data.reciverId || this.auth.user['_value'].nameid == data.senderId) {
        console.log(data);
        this.http.Get(`/Users/GetConversation/${this.user?.id}`).subscribe(res=>{
          this.con = res
          // console.log(this.con);
        })
      }
    }))



  }

  Send(SendFrom:FormGroup){
    // console.log(SendFrom.value);
    this.http.Post("/Users/SendMessage",SendFrom.value).subscribe(res=>{
      // console.log(res);
      SendFrom.controls['content'].setValue('');
    })
  }

}
