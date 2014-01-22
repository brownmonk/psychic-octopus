// General Server Utilities
module.exports = {
  // Parses URL query into an object
  serialize: function(obj) {
    var str = [];
    for(var p in obj)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
  },
  // Checks if am object is empty (aka has none of its own properties)
  isEmpty: function(obj) {
    return Object.keys(obj).length === 0;
  },
  // Removes HTML markup
  stripHtml: function(str){
    if(!str) return undefined;
    return str.replace(/<(?:.|\n)*?>/gm, '')
  }
};
