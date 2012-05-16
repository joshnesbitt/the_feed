App.View.Items = Backbone.View.extend({

  initialize : function(){
    this.template = Handlebars.compile($('#items-template').html());
  },

  render : function(items){
    this.items = items;
    this.$el.empty();

    items.each(function(item){
      var view = new App.View.Item;

      this.$el.append(view.render(item));
    }, this);
  }

});
