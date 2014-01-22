module.exports = function(apo){
  var bone = apo.bone;
  // Middleware tests
  var isApoTypeTest   = require('./middleware/isApoType');
  var isHandshakeTest = require('./middleware/isHandshake');

  // Client token returned on handshake IO
  var clientToken = {
    // TODO: Send some kind of client token
    authorized: true,
    session: "junction session id",
    channel: "apo channel id"
  };

  // Rejected handshake response
  var rejectedReason = {
    apoType: "error",
    "error": {
      handshake: "Handshake Rejected."
    }

  };

  // Verify the handshake
  var verifyHandshake = function(){
    // TODO: check / update the model sent with the handshake
    return true;
  };


  return bone.io("Handshake Channel", {
    outbound:{
      middleware: [],
      // Handshakes are accepted or rejected
      routes: ["accept", "reject"]
    },
    inbound: {
      middleware: [
        isApoTypeTest,
        isHandshakeTest
      ],
      hail: function(client){
        var isVerified = verifyHandshake(client);
        if(isVerified) { this.accept(clientToken); return; }
        this.reject(rejectedReason);
      }
    }
  });
};