App.View.YouTubePlayer = App.View.Player.extend({

  templateID : '#youtube-template',

  parseID : function(){
    return this.item.get('link').match(/youtube\.com\/watch\?v=([A-Za-z0-9_-]+)/i)[1];
  }

});
