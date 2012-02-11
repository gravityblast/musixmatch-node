var http    = require("http");
var events  = require("events");
var Config	= require("./config");

var ApiKeyNotSpecifiedError = function() {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = "ApiKeyNotSpecifiedError";
  this.message = "API KEY not specified. Try with: mXm.Config.API_KEY = 'YOUR_API_KEY'. Or set the MUSIX_MATCH_API_KEY variable in your environment."
};

ApiKeyNotSpecifiedError.prototype.__proto__ = Error.prototype;

var Request = module.exports = function(action, params) {
	this.client   = http.createClient(80, Config.API_HOST);
  this.request  = this.initRequest(Config.API_BASE_PATH + "/" + action + "?" + this.buildQueryString(params));
  this.data = "";
};

Request.prototype = new events.EventEmitter();

Request.prototype.buildQueryString = function(params) {
  if (Config.API_KEY == undefined) throw new ApiKeyNotSpecifiedError();
	params.apikey = Config.API_KEY  
	var queryString = [];
	for (var k in params) {
		queryString.push(encodeURIComponent(k) + "=" + encodeURIComponent(params[k]));
	}    
  return queryString.join("&");
};   

Request.prototype.initRequest = function(path) {
	var request = this.client.request("GET", path, {Host : Config.API_HOST});
  request.on("response", this.responseHandler.bind(this));
  request.end();
  return request;
};   

Request.prototype.responseHandler = function(response) {
	response.on("data", this.dataHandler.bind(this));
  response.on("end", this.endHandler.bind(this));
};    

Request.prototype.dataHandler = function(chunk) {
	this.data += chunk;
};   
    
Request.prototype.endHandler = function() {
	this.emit("end", this.data);
};