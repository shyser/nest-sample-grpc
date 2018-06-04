import { Transport, GrpcOptions } from '@nestjs/microservices';
import { join } from 'path';

const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',
    package: 'hellostreamingworld',
    protoPath: join(__dirname, './hello.proto'),
  },
};

export default grpcOptions;
