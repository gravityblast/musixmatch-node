# musiXmatch API library for NodeJS

## Installation

    npm install -g musixmatch

## Examples

    var util  = require("util");
    var mXm   = require("musixmatch");
    
    mXm.Config.API_KEY = "YOUR_API_KEY";

    var successCallback = function(modelOrCollection) {
      console.log("Success:");
      console.log("  " + util.inspect(modelOrCollection));
    };

    var errorCallback = function(response) {
      console.log("Error callback:");
      console.log("  " + util.inspect(response));
    };

    mXm.API.getTrack(TRACK_ID, successCallback, errorCallback);
    mXm.API.getLyrics(LYRICS_ID, successCallback, errorCallback);
    mXm.API.getArtist(ARTIST_ID, successCallback, errorCallback);
    mXm.API.getAlbum(ALBUM_ID, successCallback, errorCallback);
    mXm.API.getSubtitle(TRACK_ID, successCallback, errorCallback);
    mXm.API.searchTrack({q: QUERY}, successCallback);
