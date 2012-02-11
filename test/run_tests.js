var assert 	= require("assert"),
		sys 		= require("util"),
		fs			= require("fs");
		
var TestSuite = {
	colors: {
    green: 	'\033[32m',
    red: 		'\033[31m',
    yellow: '\033[33m',
    none: 	'\033[0m'
  },	
	
	testsCount: 	0,
	
	failures: 		[],
	
	run: function(modulePaths) {				
		var startTime, endTime;
		modulePaths.forEach(function(modulePath) {			
			startTime = new Date();
			this.runTestsForModule(modulePath);
			endTime 	= new Date();			
		}.bind(this));
		this.printFailures();
		this.printSummaryMessage((endTime.getTime() - startTime.getTime()) / 1000);
	},
	
	printSummaryMessage: function(seconds) {
		this.print("\n\nFinished in " + seconds + " seconds");
		var message = this.testsCount + " tests, " + this.failures.length + " errors";
		var color 	= this.failures.length == 0 ? this.colors.green : this.colors.red;		
		this.print(message, true, color);
	},
	
	printFailures: function() {
		if (this.failures.length > 0) {
			this.print("\n\nFailures: ");
			for (var i = 0; i < this.failures.length; i++) {
				var failure = this.failures[i];
				var index = i + 1;
				this.print(index + ") " + failure.testName);
				this.printErrorMessage(failure.error, failure.modulePath, index.toString().length + 2);
			}
		}
	},
	
	printErrorMessage: function(message, modulePath, indentation) {
		for (var i = 0; i < indentation; i++) {
			message 		= " " + message;
			modulePath 	= " " + modulePath;
		}
		this.print(message, true, this.colors.red);
		this.print(modulePath + "\n", true);
	},

	runTestsForModule: function(modulePath) {		
		var module = require(modulePath);
		for (var testName in module) {
			this.runTest(testName, module, modulePath);			
		}
	},
	
	runTest: function(testName, module, modulePath) {
		try {
			module[testName].call(module);
			this.print(".", false, this.colors.green);
		}	catch(error) {
			this.failures.push({
				testName		: testName,
				error				: error,
				modulePath	: modulePath
			});
			this.print("F", false, this.colors.red);
		}
		this.testsCount++;
	},
	
	print: function(message, newLine, color) {
		color 	= color || this.colors.none;		
		newLine	= newLine == undefined || newLine == true ? true : false;
		sys[newLine ? "puts" : "print"].call(sys, color + message + this.colors.none);
	}		
};

fs.readdir(__dirname, function(err, files) {
	if (!err) {
		var paths = [];
		files.forEach(function(path) {
			if (__dirname + "/" + path != __filename) {
				paths.push("./" + path);
			}
		});
		TestSuite.run(paths);
	}
});