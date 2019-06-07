"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helloStreamApi = exports.helloApi = void 0;

var grpc = require('grpc');

var protoLoader = require('@grpc/proto-loader');

var packageDefinition = function packageDefinition(PROTO_PATH) {
  return protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
};

var hello_proto = grpc.loadPackageDefinition(packageDefinition(__dirname + '/../../../protos/helloworld.proto')).helloworld;
var hellostreaming_proto = grpc.loadPackageDefinition(packageDefinition(__dirname + '/../../../protos/hellostreamingworld.proto')).hellostreamingworld;
var helloApi = new hello_proto.Greeter('localhost:50051', grpc.credentials.createInsecure());
exports.helloApi = helloApi;
var helloStreamApi = new hellostreaming_proto.MultiGreeter('localhost:50051', grpc.credentials.createInsecure());
exports.helloStreamApi = helloStreamApi;