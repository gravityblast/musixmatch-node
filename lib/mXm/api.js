var Request = require("./request");
var Model   = require("./model");

module.exports = {
  getTrack: function(track_id, callback, errorCallback) {
    this.sendModelRequest("track.get", {track_id: track_id}, callback, errorCallback, "track", Model.TRACK);
	},
      
  getLyrics: function(track_id, callback, errorCallback) {
    this.sendModelRequest("track.lyrics.get", {track_id: track_id}, callback, errorCallback, "lyrics", Model.LYRICS);
	},

  getArtist: function(artist_id, callback, errorCallback) {
    this.sendModelRequest("artist.get", {artist_id: artist_id}, callback, errorCallback, "artist", Model.ARTIST);
	},

  getAlbum: function(album_id, callback, errorCallback) {
		this.sendModelRequest("album.get", {album_id: album_id}, callback, errorCallback, "album", Model.ALBUM);
	},

  getSubtitle: function(track_id, callback, errorCallback) {
    this.sendModelRequest("track.subtitle.get", {track_id: track_id}, callback, errorCallback, "subtitle", Model.SUBTITLE);
	},
	
  searchTrack: function(params, callback, errorCallback) {
    this.sendCollectionRequest("track.search", params, callback, errorCallback, "track_list", "track", Model.SUBTITLE);
	},
  
  searchArtist: function(params, callback, errorCallback) {
    this.sendCollectionRequest("artist.search", params, callback, errorCallback, "artist_list", "artist", Model.SUBTITLE);
	},

  sendModelRequest: function(action, params, callback, errorCallback, item_name, model_name) {
    this.sendRequest(action, params, function(json) {
			if(json.message.header.status_code == 200) {
				var model = new Model(model_name, json.message.body[item_name]);
        callback.call(this, model);
			} else {
				if (errorCallback) {
          errorCallback.call(this, json);
        }
			}
		});
  },

  sendCollectionRequest: function(action, params, callback, errorCallback, collection_name, item_name, model_name) {
    this.sendRequest(action, params, function(json) {
			if(json.message.header.status_code == 200) {
				var models = [];
				json.message.body[collection_name].forEach(function(model_attributes) {
					models.push(new Model(model_name, model_attributes[item_name]));
				});				        	
        callback.call(this, models);
			} else {
				if (errorCallback) errorCallback.call(this, null);
			}        
		});      
	},
	
  sendRequest: function(action, params, callback) {
    var request = new Request(action, params);
    request.on("end", function(data) {
			callback.call(this, JSON.parse(data));
		});
	}
};