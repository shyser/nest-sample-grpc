import { Get, Param, Controller, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { HelloRequest, HelloReply, MultiGreeter } from './hello.interface';
import clientOptions from './hello.options';

@Controller('hello')
export class HelloController implements OnModuleInit {
  @Client(clientOptions) 
  private readonly client: ClientGrpc;
  private helloService: MultiGreeter;

  onModuleInit() {
    this.helloService = this.client.getService<MultiGreeter>('MultiGreeter');
  }

  @Get(':name/:num_greetings')
  sayHello(@Param() param: HelloRequest): HelloReply {
    console.log('get param', param);
    return this.helloService.sayHello(param);
  }

  @Get(':name/:num_greetings/stream')
  handleSayHelloStream(@Param() param: HelloRequest): Observable<any> {
    const stream = this.helloService.sayHelloStream(param);
    const sub = () => stream.subscribe({
      next: data => {
        console.log('get stream', data);
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
    return from(['OK']);
  }

}
