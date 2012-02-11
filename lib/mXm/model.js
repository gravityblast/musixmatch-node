var Model = module.exports = function(name, attributes) {
	this.name 			= name;
	this.attributes = attributes;
};
 
Model.prototype.attr = function(name) {
	return this.attributes[name];
};

module.exports.TRACK    = "Track";
module.exports.LYRICS   = "Lyrics";
module.exports.ARTIST   = "Artist";
module.exports.ALBUM    = "Album";
module.exports.SUBTITLE = "Subtitle";