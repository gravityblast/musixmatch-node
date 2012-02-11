var assert 	= require("assert"),
		Model		= require("./../lib/mXm/model");

module.exports = {
	"should set model name" : function() {
		var name = "post";
		var post = new Model(name, {});
		assert.equal(name, post.name);
	},
	
	"should set model attributes" : function() {
		var attributes = {
			title	: "This is the title",
			body	: "This is the body"
		};
		var post = new Model("post", attributes);
		assert.equal(attributes, post.attributes);
	},
	
	"should get model attributes" : function() {
		var attributes = {
			title	: "This is the title",
			body	: "This is the body"
		};
		var post = new Model("post", attributes);
		assert.equal(attributes.title, 	post.attr("title"));
		assert.equal(attributes.body, 	post.attr("body"));
	}
};