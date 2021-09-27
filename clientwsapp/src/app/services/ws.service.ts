import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class WsService {
  constructor(private socket: Socket) {
    this.socket.connect();
  }

  onEmit(eventName: string, payload: string){
    this.socket.emit(eventName, payload);
  }
  
  onGet(eventName: string){
    return this.socket.fromEvent<string>(eventName);
  }

}
