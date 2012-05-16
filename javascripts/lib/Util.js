App.Util = {

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
  }

};
