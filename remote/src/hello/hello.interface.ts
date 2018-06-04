export interface HelloRequest {
  name: string;
  num_greetings: string;
}

export interface HelloReply {
  index: number;
  reply_message: string;
}