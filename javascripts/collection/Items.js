App.Collection.Items = SignalBox.Backbone.Collection.extend({

  model : App.Model.Item,

  resource : 'items',

  toJSON : function(){
    return this.map(function(item){
      return item.toJSON();
    })
  }

});
