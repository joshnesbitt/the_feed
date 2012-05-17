$(function(){

  SignalBox.setup({
    username : 'signalboxdemo',
    app      : 'thefeed-production'
  });

  window.application = new App.View.Application({
    el : $('body')
  });

});
