soundcloud.addEventListener('onPlayerReady', function(player, data) {
  player.api_play();
});

App.View.SoundCloudPlayer = Backbone.View.extend({

  initialize : function(){
    this.template = Handlebars.compile($('#soundcloud-template').html());
  },

  render : function(item){
    this.item = item;

    // TODO: Better way to tear down views
    $('.item').removeClass('open');
    $('.item .player').empty();

    this.$el.html(this.template({ id : this.parseID() }));
    this.$el.closest('.item').addClass('open');

    return this.$el;
  },

  parseID : function(){
    return encodeURIComponent(this.item.get('link'));
  },

  destroy : function(){
    this.$el.closest('.item').removeClass('open');
    this.remove();
  }

});
