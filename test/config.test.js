var assert = require("assert");

module.exports = {
	"should get API_KEY from env" : function() {
		var API_KEY = "my-api-key";
		process.env["MUSIX_MATCH_API_KEY"] = API_KEY;
		var config = require("./../lib/mXm/config");
		assert.equal(API_KEY, config.API_KEY);
	}
};