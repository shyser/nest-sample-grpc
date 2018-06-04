import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import HelloGrpcOptions from './hello/hello.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = app.connectMicroservice(HelloGrpcOptions);
  await service.listenAsync();
}
bootstrap();
