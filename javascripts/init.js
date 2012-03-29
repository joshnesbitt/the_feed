$(function(){

  window.application = new window.App({
    credentials : {
      sb_version  : 1,
      sb_username : 'thefeed',
      sb_app_name : 'thefeed-production'
    },
    resource : 'items'
  });

  window.application.run();

});
