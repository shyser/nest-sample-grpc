import { Get, Param, Controller, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { HelloRequest, HelloReply, MultiGreeter } from './hello.interface';
import clientOptions from './hello.remote.options';
import { Observable, from, fromEvent } from 'rxjs';
import { EventEmitter } from 'events';

@Controller('hello')
export class HelloController implements OnModuleInit {
  @Client(clientOptions)
  private readonly client: ClientGrpc;
  private helloRemoteService: MultiGreeter;

  onModuleInit() {
    this.helloRemoteService = this.client.getService<MultiGreeter>('MultiGreeter');
  }

  @Get(':name/:num_greetings')
  @GrpcMethod('MultiGreeter')
  sayHello(@Param() param: HelloRequest): HelloReply {
    console.log('get param', param);
    return this.helloRemoteService.sayHello(param);
  }

  @Get(':name/:num_greetings/stream')
  handleSayHelloStream(@Param() param: HelloRequest): Observable<HelloReply> {
    this.sayHelloStream(param);
    return from([{ index: 999, reply_message: 'OK' }]);
  }

  @GrpcMethod('MultiGreeter')
  sayHelloStream(param: HelloRequest): Observable<HelloReply> {
    const event = new EventEmitter();
    const stream = this.helloRemoteService.sayHelloStream(param);
    const sub = () => stream.subscribe({
      next: data => {
        console.log('get stream', data);
        event.emit('data', data);
      },
      error: err => {
        console.log('get error', err);
        setTimeout(() => {
          console.log('resubscribe');
          sub();
        }, 2000);
      },
      complete: () => console.log('stream complete'),
    });
    sub();
    return fromEvent(event, 'data');
  }
}
