var root = require('path').normalize(__dirname + '/..');
module.exports = {
  // Development Config
  development: {
    root: root,
    client: {
      path: root + '/client',
      port: 3000
    },
    db: {
      host: 'ds027789.mongolab.com',
      port: 27789,
      dbname: "gamedb",
      username: "gamedbuser",
      password: "gamedbpass"
    },
    stack: root + '/server',
    utils: root + '/server/utils',
    models: root + '/server/models',
    config: root + '/server/config'
  },

  // Test Config
  test: {
    root: root,
    client: {
      path: root + '/client',
      port: 3001
    },
    db: {
      host: 'ds053448.mongolab.com',
      port: 53448,
      dbname: "apotheosisdb",
      username: "apotheosis",
      password: "sun1123rise"
    },
    stack: root + '/server',
    middleware: root + '/server/middleware',
    models: root + '/server/models',
    config: root + '/config'
  },

  production: {

  }

};
