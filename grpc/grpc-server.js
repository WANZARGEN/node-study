var PROTO_PATH = __dirname + '/../protos/helloworld.proto';
var PROTO_PATH2 = __dirname + '/../protos/hellostreamingworld.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
    var packageDefinition2 = protoLoader.loadSync(
      PROTO_PATH2,
      {keepCase: true,
       longs: String,
       enums: String,
       defaults: true,
       oneofs: true
      });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
var hello_proto2 = grpc.loadPackageDefinition(packageDefinition2).hellostreamingworld;


/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

function sayMultiHello(call, callback) {
  callback(null, {message: 'Hello2 ' + call.request.name});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
  server.addService(hello_proto2.MultiGreeter.service, {sayMultiHello: sayMultiHello});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
