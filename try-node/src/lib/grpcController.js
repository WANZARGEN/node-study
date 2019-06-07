var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = (PROTO_PATH) => {
return protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
    });
}

const hello_proto = grpc.loadPackageDefinition(packageDefinition(__dirname + '/../../../protos/helloworld.proto')).helloworld;
const hellostreaming_proto = grpc.loadPackageDefinition(packageDefinition(__dirname + '/../../../protos/hellostreamingworld.proto')).hellostreamingworld;

export const helloApi = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());
export const helloStreamApi = new hellostreaming_proto.MultiGreeter('localhost:50051', grpc.credentials.createInsecure());