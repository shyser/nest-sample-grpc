import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import HelloGrpcOptions from './hello/hello.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(HelloGrpcOptions);
  await app.startAllMicroservicesAsync();
  await app.listen(3001);
}
bootstrap();
