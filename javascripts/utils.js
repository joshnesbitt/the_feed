App.utils = {

  randomColour : function(){
    return _.shuffle([
      'green',
      'pink',
      'purple',
      'blue',
    ])[0]
  },

  randomWidth : function(){
    return _.shuffle([
      50,
      60,
      70,
      80
    ])[0]
  },

  appendParamsToURL : function(url, params){
    var prefix = (url.indexOf("?") > -1) ? "&" : "?";

    return url + prefix + $.param(params);
  }

};
