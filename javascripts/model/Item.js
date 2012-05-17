App.Model.Item = SignalBox.Backbone.Model.extend({

  resource : 'items',

  initialize : function(){
    this.set('type', this.parseType());
  },

  parseType : function(){
    var type = 'unknown',
        link = this.get('link');

    if(/youtube\.com/i.test(link))
      type = 'youtube';

    if(/soundcloud\.com/i.test(link))
      type = 'soundcloud';

    return type;
  }

});
