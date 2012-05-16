App.View.Application = Backbone.View.extend({

  initialize : function(){
    this.items = new App.Collection.Items;
    this.itemsView = new App.View.Items({ el : $('#items') });
    this.items.fetch({ success : _(this.onFetchSuccess).bind(this) });
  },

  onFetchSuccess : function(collection){
    this.itemsView.render(collection);
  }

});
