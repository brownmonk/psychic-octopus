module.exports = function(data, context, next) {
  data = data || {}; // prevents undefined.value error

  // When data is rejected, it is replaced by this object
  var rejectedData = {
    apoType: "error",
    "error": "ERROR: Data rejected"
  };

  // TODO: Condition for files
  if(data.apoType == "shapefileUpload"){
    if(next) next(); // Next === done === callback
    return data; // for testing
  }

  // Reject all other data
  return rejectedData;
};