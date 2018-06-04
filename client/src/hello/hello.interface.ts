import { Observable } from 'rxjs';

export interface HelloRequest {
  name: string;
  num_greetings: string;
}

export interface HelloReply {
  index: number;
  reply_message: string;
}

export interface MultiGreeter {
  sayHello(data: HelloRequest): HelloReply;
  sayHelloStream(data: HelloRequest): Observable<HelloReply>;
}