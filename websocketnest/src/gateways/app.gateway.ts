import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  /**
   *
   * @param server
   */
  afterInit(server: Server) {
    this.logger.log('Initialized');
  }

  /**
   * Receive the event from clients
   * @param client This is client socket
   * @param payload
   */
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void{
    this.logger.log(payload);
    this.wss.emit('msgToClient', payload);
    //return { event: 'msgToClient', data: payload };
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected: ' + client.id);
  }

}
