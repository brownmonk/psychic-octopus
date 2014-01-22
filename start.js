// Start the server
var apo = require('./server/apo')('Apotheosis Server: ', "development");

// Set scope globals
var config    = apo.config
    , colors    = apo.colors
    , app       = apo.app
    , server    = apo.server
    , async     = apo.async
    , mongoose  = apo.mongoose
    , buckets   = apo.buckets;

// Async Loader
async.series({
  // Database
  database: function(done){
    var databaseURL = 'mongodb://'
        + config.db.username + ':'
        + config.db.password + '@'
        + config.db.host + ':'
        + config.db.port + '/'
        + config.db.dbname;

    mongoose.connect(databaseURL);

    // Save the database connection to the global and locally
    var db = apo.db = mongoose.connection;

    // Get the the schema for a player
    var Player = require(config.models + "/Player.js")();

    // Save models in a container and attach the container to the apo global (for async)
    apo.modelDict = new buckets.Dictionary();
    apo.modelDict.set("Player", Player);

    // Open an initializer connection to the database
    db.once("open", function(){
      console.log("Connected to DB " + config.db.host + ":" + config.db.port);
      require(config.utils + '/initDB.js')(apo.modelDict, function(){
        done();
      });
    });

    // Handle errors
    db.on("error", function(error){
      console.log("ERROR:", error);
    });
  },
  // I/O
  channels: function(done){
    // Channels
    var Handshake   = require('./server/channels/Handshake')(apo);

    done();
  }
});

// Listen up
app.listen();
server.listen(config.client.port);