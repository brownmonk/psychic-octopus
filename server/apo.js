module.exports = function(serverName, type){
  var colors = require('colors');
  // Log Name and type
  console.log(serverName.blue, type.red);

  // Setup express, socket.io, and http server
  var express = require('express');
  var app = express();
  var server = require('http').createServer(app);
  var io = require('socket.io');
  var sio = io.listen(server); sio.set("log level", 1); // Disable socket heartbeat msg

  // Config
  var config = require("./config")[type];

  // Utilities
  var utils = require("./utils/utils.js");

  // Buckets
  var buckets = require(config.utils + "/buckets");

  // Database (MongoDB)
  var mongoose = require("mongoose");

  // Async -- Let's be honest, node is terrible without it
  var async = require("async");

  // Delivery -- (for file uploading)
  var dl = require("delivery");

  // File system reference
  var fs = require("fs");

  // Log Port
  console.log("port:",config.client.port);

  // Configure bone.io options
  var bone = require('bone.io');
  bone.set('io.options', {
    server: sio
  });

  // Session declaration
  var sessionConfig = {
    secret: 'keyboard-kitty',
    cookie: {
      secret: 'keyboard-kitty'
    },
    store: new express.session.MemoryStore()
  };

  // Hook into express
  //app.use(sessionConfig);

  // Serves bone.io browser scripts
  app.use(bone.static());

  // Serve client directory
  app.use(express.static(config.client.path));

  // Show errors in browser
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));


  return {
    express: express,
    sessionConfig: sessionConfig,
    app: app,
    server: server,
    io: io,
    sio: sio,
    dl: dl,
    fs: fs,
    config: config,
    utils: utils,
    buckets: buckets,
    mongoose: mongoose,
    async: async,
    bone: bone,
    colors: colors,
    db        : {},
    modelDict : {}
  };
};