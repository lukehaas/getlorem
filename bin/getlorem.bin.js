#!/usr/bin/env node

var optimist = require('optimist'),
	getlorem = require('./../lib/getlorem'),
	execute = require('child_process').exec,
	statement = '';

var options    = {},
	arguments  = optimist.argv,
	loremIpsum = '';



var clipper = function(text, next) {
	statement = 'echo "' + text + '" | ';

	switch (process.platform) {
		case 'darwin':
			statement = statement + 'pbcopy';
			break;
		case 'win32':
			statement = statement + 'clip';
			break;
		case 'linux':
		default:
			statement = statement + 'xclip -selection clipboard';
	}

	execute(statement, function(err, stdout, stderr) {
		if (err) {
			next(new Error('Failed to copy data to clipboard'));
		}
		next(null);
	});
};


// Allow CLI user to run command with plain english. E.g. "getlorem 1 sentence" or "getlorem 3 words --copy"
var nakedArguments = arguments._;
if (nakedArguments.length >= 2) {
  arguments.count = nakedArguments[0]; // Clobber count.
  arguments.units = nakedArguments[1]; // Clobber units.
}

options.units  = arguments.units || 'words';
options.count  = arguments.count || 1;
options.copy   = arguments.copy ? true : false;
options.tags = arguments.tags || false;
options.swl   = arguments.swl ? true : false;

switch(options.units) {
	case "paragraphs" || "paragraph":
		loremIpsum = getlorem.paragraphs(options.count, options.tags, options.swl);
		break;
	case "words" || "word":
		loremIpsum = getlorem.words(options.count, options.tags, options.swl);
		break;
	case "bytes" || "byte":
		loremIpsum = getlorem.bytes(options.count, options.tags, options.swl);
		break;
	case "lists" || "list":
		loremIpsum = getlorem.lists(options.count, options.tags, options.swl);
		break;
}

console.log(loremIpsum);

// Copy to clipboard.
if (options.copy) {
  clipper(loremIpsum, function(err) { err ? process.exit(1) : process.exit() });
} else {
  process.exit(); // Successful exit.
}
