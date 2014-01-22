module.exports = function(modelDict, callback){

  var Player = modelDict.get('Player');

  if(Player){

    var player1 = new Player({
      handle: 'jctadmin',
      email: 'jctmap@gmail.com',
      passcode: 'sun1123rise'
    });

    Player.findOne({handle: 'jctadmin'}, function(err, obj){
      if(!obj){
        player1.save(function (err) {
          console.log(err);
          if (err) {
            console.log('Failed to add jctadmin. InitDB failed');
            console.log(err);
            callback(err, obj);
          }
          else
            console.log('Adding jctadmin to DB');
          callback(err, obj);
        })

      }
      else{
        //console.log('Player ' + obj.handle + ' exists. Not adding to DB');
        callback(err, obj);
      }
    })
  }

}

