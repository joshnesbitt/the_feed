soundcloud.addEventListener('onPlayerReady', function(player, data) {
  player.api_play();
});

App.View.SoundCloudPlayer = App.View.Player.extend({

  templateID : '#soundcloud-template',

  parseID : function(){
    return encodeURIComponent(this.item.get('link'));
  }

});
