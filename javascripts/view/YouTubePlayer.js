App.View.YouTubePlayer = Backbone.View.extend({

  initialize : function(){
    this.template = Handlebars.compile($('#youtube-template').html());
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
    return this.item.get('link').match(/youtube\.com\/watch\?v=([A-Za-z0-9_-]+)/i)[1];
  },

  destroy : function(){
    this.$el.closest('.item').removeClass('open');
    this.remove();
  }

});
