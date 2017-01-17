"use strict";
var test = require("tap").test;
var getlorem = require("../lib/getlorem.js");


test("Can get one word",function(t) {
	t.equal(getlorem.word().split(" ").length,1);
	t.end();
});
test("Can get multiple words",function(t) {
	t.equal(getlorem.words(5).split(" ").length,5);
	t.end();
});
test("Can get one sentence",function(t) {
	t.equal(getlorem.sentence().split(".").length,2);
	t.end();
});
test("Can get multiple sentences",function(t) {
	t.equal(getlorem.sentences(5).split(".").length,6);
	t.end();
});
test("Can get bytes",function(t) {
	t.equal(getlorem.bytes(5).length,5);
	t.end();
});
