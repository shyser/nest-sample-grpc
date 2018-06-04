import { GrpcMethod } from '@nestjs/microservices';
import { HelloRequest, HelloReply } from './hello.interface';
import { Observable, fromEvent } from 'rxjs';
import { EventEmitter } from 'events';
import { Metadata } from 'grpc';

export class HelloController {
  @GrpcMethod('MultiGreeter')
  sayHello(param: HelloRequest, meta: Metadata): HelloReply {
    console.log('get param', param);
    return {
      index: 123,
      reply_message: 'I am remote service',
    };
  }

  @GrpcMethod('MultiGreeter')
  sayHelloStream(param: HelloRequest, meta: Metadata): Observable<HelloReply> {
    console.log('sayHelloStream get param', param);
    const event = new EventEmitter();
    let index = 0;
    const reply_message = Math.random().toString();
    let setIntervalid = setInterval(() => {
      index += 1;
      const data: HelloReply = { index, reply_message };
      console.log('send', data);
      event.emit('data', data);
    }, 1000);
    const result: Observable<HelloReply> = fromEvent(event, 'data');
    return result;
  }
}
