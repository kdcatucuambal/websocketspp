import { Component, OnInit } from '@angular/core';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public messages: string[];

  constructor(private ws: WsService) {
    this.messages = [];
   }

  ngOnInit(): void {
    this.ws.onGet("msgToClient").subscribe(data=>{
      this.messages.push(data);
    })
  }

  onSetValue(inputText: HTMLInputElement){
    this.ws.onEmit("msgToServer", inputText.value.trim());
 
  }

}
