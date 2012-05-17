App.View.Player = Backbone.View.extend({

  initialize : function(){
    this.template = Handlebars.compile($(this.templateID).html());
  },

  parseID : function(){},

  render : function(item){
    this.item = item;

    $('.item').removeClass('open').find('.player').empty();
    this.$el.html(this.template({ id : this.parseID() }));
    this.$el.closest('.item').addClass('open');

    return this.$el;
  },

  destroy : function(){
    this.$el.closest('.item').removeClass('open');
    this.remove();
  }

});
