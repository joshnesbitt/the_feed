window.App = function(settings){
  this.settings = settings;

  var Item = function(obj){
    _.extend(this, obj);

    this._meta = {
      colour : App.utils.randomColour(),
      width  : App.utils.randomWidth()
    };

    this.detectType = function(){
      var type = 'unknown';

      if(/youtube\.com/i.test(this.link)) type = 'youtube';
      if(/soundcloud\.com/i.test(this.link)) type = 'soundcloud';

      return type;
    };

    this.createPreview = function(){
      var klass;

      switch(this.detectType()){

        case 'youtube':
          klass = YouTubePreview;
        break;

        case 'soundcloud':
          klass = SoundCloudPreview;
        break;

      }

      this.preview = new klass(this);
    };

    this.createPreview();
  };

  var ItemCollection = function(collection){
    this.template = Handlebars.compile($('#items-template').html());

    this.items = _.map(collection, function(obj){
      return new Item(obj);
    }, this);

    this.toJSON = function(){
      return { items : this.items };
    };

    this.render = function(){
      return this.template(this.toJSON());
    };

    this.find = function(id){
      return _.find(this.items, function(m){ return m._id === id; });
    };
  };

  var YouTubePreview = function(item){
    this.parseRegex = /youtube\.com\/watch\?v=([A-Za-z0-9]+)/i;
    this.item = item;

    this.parseID = function(url){
      return url.match(this.parseRegex)[1];
    };

    this.render = function(){
      return [
        '<iframe',
        'width="560"',
        'height="315"',
        'src="http://www.youtube.com/embed/' + this.parseID(this.item.link) + '?autoplay=1"',
        'frameborder="0"',
        'allowfullscreen>',
        '</iframe>'
      ].join(' ');
    };
  };

  var SoundCloudPreview = function(item){
    this.item = item;

    this.parseID = function(){
      return encodeURIComponent(this.item.link);
    };

    this.render = function(){
      var id = this.parseID();

      soundcloud.addEventListener('onPlayerReady', function(player, data) {
        player.api_play();
      });

      return [
        '<object height="81" width="100%" id="soundcloudPreview" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000">',
        '<param name="movie" value="http://player.soundcloud.com/player.swf?url=' + id + '&enable_api=true&object_id=soundcloudPreview"></param>',
        '<param name="allowscriptaccess" value="always"></param>',
        '<embed allowscriptaccess="always" height="81" src="http://player.soundcloud.com/player.swf?url=' + id + '&enable_api=true&object_id=soundcloudPreview" type="application/x-shockwave-flash" width="100%" name="soundcloudPreview"></embed>',
        '</object>'
      ].join('');
    }
  };

  // App

  this.launchItem = function(e){
    e.preventDefault();

    var $item = $(e.currentTarget).closest('.item'),
        item  = this.items.find($item.attr('data-id'));

    $('.item[data-id!="' + item._id + '"]').removeClass('open');
    $('.item .preview').empty();

    if($item.hasClass('open')){
      $item.removeClass('open');
    }
    else {
      $item.addClass('open');
      $item.find('.preview').html(item.preview.render());
    }
  };

  this.setup = function(){
    $.ajaxSetup({
      cache      : false,
      dataType   : "json",
      beforeSend : _.bind(function(xhr, settings) {
        settings.url = App.utils.appendParamsToURL(settings.url, this.settings.credentials);

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
      }, this)
    });

    $('#content').on('click', 'a.launch', _.bind(this.launchItem, this));
  };

  this.run = function(){
    $.ajax({
      method  : 'GET',
      url     : 'http://api.getsignalbox.com/resources/' + this.settings.resource,
      success : _.bind(function(response){
        this.items = new ItemCollection(response.records);

        $("#items").html(this.items.render());
      }, this)
    });
  };

  this.setup();
};
