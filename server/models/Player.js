/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , crypto = require('crypto');

module.exports = function(){
  return mongoose.model('Player', PlayerSchema);
}


/**
 * Player Schema
 */
var PlayerSchema = new Schema({
  handle: String,
  hashed_passcode: String,
  email: String,
  salt: String
})

/**
 * Virtuals
 */
PlayerSchema
    .virtual('passcode')
    .set(function(passcode) {
      this._passcode = passcode;
      this.salt = this.makeSalt();
      this.hashed_passcode = this.encryptPasscode(passcode);
    })
    .get(function() { return this._passcode })

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length
}

PlayerSchema.path('handle').validate(function (handle) {
  return handle.length
}, 'Handle cannot be blank')

PlayerSchema.path('email').validate(function (email) {
  // if you are authenticating by any of the oauth strategies, don't validate
  return email.length
}, 'Email cannot be blank')

PlayerSchema.path('hashed_passcode').validate(function (hashed_passcode) {
  return hashed_passcode.length
}, 'Password cannot be blank')


/**
 * Pre-save hook
 */

PlayerSchema.pre('save', function(next) {
  if (!this.isNew) return next()

  if (!validatePresenceOf(this.passcode))
    next(new Error('Password cannot be blank'))
  else
    next()
})

/**
 * Methods
 */
PlayerSchema.methods = {

  /**
   * Authenticate - check if the passcodes are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function(plainText) {
    return this.encryptPasscode(plainText) === this.hashed_passcode
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + 'xtc'
  },

  /**
   * Encrypt passcode
   *
   * @param {String} passcode
   * @return {String}
   * @api public
   */

  encryptPasscode: function(passcode) {
    if (!passcode) return ''
    return crypto.createHmac('sha1', this.salt).update(passcode).digest('hex')
  }
}

