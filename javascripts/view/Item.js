App.View.Item = Backbone.View.extend({

  events : {
    'click a.toggle-player' : 'togglePlayer'
  },

  initialize : function(){
    this.template = Handlebars.compile($('#item-template').html());
    this.meta = {
      colour : App.Util.randomColour(),
      width  : App.Util.randomWidth()
    };
  },

  render : function(item){
    this.item = item;

    this.$el.html(this.template({
      item : this.item.toJSON(),
      meta : this.meta
    })).find('.body a').attr('target', '_blank');

    return this.$el;
  },

  togglePlayer : function(e){
    e.preventDefault();

    this.player ? this.closePlayer() : this.openPlayer();
  },

  openPlayer : function(){
    switch(this.item.get('type')){

      case 'youtube':
        klass = App.View.YouTubePlayer;
      break;

      case 'soundcloud':
        klass = App.View.SoundCloudPlayer;
      break;

    }

    this.player = new klass({ el : this.$el.find('.player') });
    this.player.render(this.item);
  },

  closePlayer : function(){
    this.player.destroy();
    delete this.player;
    this.render(this.item);
  }

});
