# nest-sample-grpc

> [Nest](https://nestjs.com/)框架下的`gRPC`功能使用演示  

### 子项目
> 该项目共包含3个子项目，尽量涵盖gRPC使用中的各类功能，以作为项目开发中的参考  

- client  
纯web服务，对外提供HTTP接口，内部创建gRPC客户端，通过gRPC协议与`server`通信  
监听端口: HTTP 3000  

- server  
既是web服务，也是gRPC服务，同时还作为gRPC客户端与`remote`通信  
监听端口: HTTP 3001, HTTP2 50051  

- remote  
纯gRPC服务，对外提供gRPC接口  
监听端口: HTTP2 50052  

### 问题列表
> 该列表持续更新，如果有知道解决办法的同学，欢迎交流学习

- 拿不到gRPC连接实例  
于是服务端在返回流中拿不到`error`、`end`之类的事件，进而导致当客户端主动中断连接后，服务端并不知道，继续傻傻地往外推数据。可能通过其他方式能拿到这些事件，待探索。

- 编译后无法运行  
编译之后`.proto`文件没有编译到`dist`文件夹，而就算手动copy进去，还是运行不起来

- gRPC `load`过程的`LoadOptions`不可配置
