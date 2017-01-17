/**
 * Getlorem - Lorem Ipsum Generator
 *
 *
 * Licensed under The MIT License.
 * Redistribution of these files must retain the above copyright notice.
 *
 * @author    Luke Haas <hello@lukehaas.me>
 * @copyright Copyright 2017 Luke Haas
 * @license   http://www.opensource.org/licenses/mit-license.html
 * @link      https://github.com/lukehaas/getlorem
 */


(function (global,factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([],function() {
			return factory(global, global.document);
		});
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = factory(global, global.document);
	} else {
		// Browser globals
		factory(global, global.document);
	}
}(typeof window !== 'undefined' ? window : this, function (window, document, undefined) {
	"use strict";

	var startWithLorem = true;
	var openingWords = [
		'lorem',        'ipsum',       'dolor',        'sit',
		'amet',         'consectetur', 'adipiscing',   'elit'
	];
	var dictionary = [
		'a',            'ac',          'accumsan',     'ad',
		'aenean',       'aliquam',     'aliquet',      'ante',
		'aptent',       'arcu',        'at',           'auctor',
		'augue',        'bibendum',    'blandit',      'class',
		'commodo',      'condimentum', 'congue',       'consequat',
		'conubia',      'convallis',   'cras',         'cubilia',
		'cum',          'curabitur',   'curae',        'cursus',
		'dapibus',      'diam',        'dictum',       'dictumst',
		'dignissim',    'dis',         'donec',        'dui',
		'duis',         'egestas',     'eget',         'eleifend',
		'elementum',    'enim',        'erat',         'eros',
		'est',          'et',          'etiam',        'eu',
		'euismod',      'facilisi',    'facilisis',    'fames',
		'faucibus',     'felis',       'fermentum',    'feugiat',
		'fringilla',    'fusce',       'gravida',      'habitant',
		'habitasse',    'hac',         'hendrerit',    'himenaeos',
		'iaculis',      'id',          'imperdiet',    'in',
		'inceptos',     'integer',     'interdum',     'justo',
		'lacinia',      'lacus',       'laoreet',      'lectus',
		'leo',          'libero',      'ligula',       'litora',
		'lobortis',     'luctus',      'maecenas',     'magna',
		'magnis',       'malesuada',   'massa',        'mattis',
		'mauris',       'metus',       'mi',           'molestie',
		'mollis',       'montes',      'morbi',        'mus',
		'nam',          'nascetur',    'natoque',      'nec',
		'neque',        'netus',       'nibh',         'nisi',
		'nisl',         'non',         'nostra',       'nulla',
		'nullam',       'nunc',        'odio',         'orci',
		'ornare',       'parturient',  'pellentesque', 'penatibus',
		'per',          'pharetra',    'phasellus',    'placerat',
		'platea',       'porta',       'porttitor',    'posuere',
		'potenti',      'praesent',    'pretium',      'primis',
		'proin',        'pulvinar',    'purus',        'quam',
		'quis',         'quisque',     'rhoncus',      'ridiculus',
		'risus',        'rutrum',      'sagittis',     'sapien',
		'scelerisque',  'sed',         'sem',          'semper',
		'senectus',     'sociis',      'sociosqu',     'sodales',
		'sollicitudin', 'suscipit',    'suspendisse',  'taciti',
		'tellus',       'tempor',      'tempus',       'tincidunt',
		'torquent',     'tortor',      'tristique',    'turpis',
		'ullamcorper',  'ultrices',    'ultricies',    'urna',
		'ut',           'varius',      'vehicula',     'vel',
		'velit',        'venenatis',   'vestibulum',   'vitae',
		'vivamus',      'viverra',     'volutpat',     'vulputate'
	];

	var run = true;

	function word(tags) {
		tags = tags || false;

		return words(1, tags);
	}

	function wordsArray(count, tags, swl) {
		count = count || 1;
		tags = tags || false;
		startWithLorem = swl || false;

		return words(count, tags, startWithLorem, true);
	}

	function words(count, tags, swl, array) {
		count = count || 1;
		tags = tags || false;
		startWithLorem = swl || false;
		array = array || false;

		var wordList = [],
			word_count = 0,
			shuffle;

		run = true;
		while (word_count < count && run) {
			shuffle = true;

			while (shuffle) {
				//wordShuffle();
				arrayShuffle(dictionary);

				if (!word_count || wordList[word_count - 1] != dictionary[0]) {
					wordList = wordList.concat(dictionary);
					word_count = wordList.length;
					shuffle = false;
				}
			}
		}

		if(startWithLorem) {
			wordList = openingWords.concat(wordList);
		}

		wordList = wordList.slice(0,count);

		if(!array) {
			wordList = [].concat.apply([],sentencise(wordList));
		}

		return output(wordList, tags, array);
	}

	function sentence(tags, swl) {
		tags = tags || false;
		startWithLorem = swl || false;

		return sentences(1, tags, startWithLorem);
	}

	function sentencesArray(count, tags, swl) {
		count = count || 1;
		tags = tags || false;
		startWithLorem = swl || false;

		return sentences(count, tags, startWithLorem, true);
	}

	function sentences(count, tags, swl, array) {
		count = count || 1;
		tags = tags || false;
		startWithLorem = swl || false;
		array = array || false;

		var sentenceList = [],
			i = 0;

		run = true;
		for (; i < count; i++) {
				sentenceList.push(wordsArray(gauss(24.46, 5.08), false, startWithLorem));
				startWithLorem = false;

				if(!run){break;}
		}

		sentenceList = punctuate(sentenceList);

		return output(sentenceList, tags, array);
	}

	function paragraph(tags) {
		tags = tags || false;

		return paragraphs(1, tags);
	}

	function paragraphsArray(count, tags, swl) {
		count = count || 1;
		tags = tags || false;
		startWithLorem = swl || false;

		return paragraphs(count, tags, startWithLorem, true);
	}

	function paragraphs(count, tags, swl, array) {
		count = count || 1;
		tags = tags || false;
		startWithLorem = swl || false;
		array = array || false;

		var paragraphList = [],
			i = 0;

		run = true;
		for (; i < count; i++) {
			paragraphList.push(sentences(gauss(5.8, 1.93),false,startWithLorem));
			startWithLorem = false;

			if(!run){break;}
		}

		return output(paragraphList, tags, array, "\n\n");
	}
	function list(tags) {
		tags = tags || false;
		return lists(1,tags);
	}
	function listsArray(count, tags, swl) {
		count = count || 1;
		tags = tags || false;
		startWithLorem = swl || false;

		return lists(count, tags, startWithLorem, true);
	}
	function lists(count, tags, swl, array) {
		count = count || 1;
		tags = tags || false;
		startWithLorem = swl || false;
		array = array || false;

		var listsList = [],
			i = 0;

		run = true;

		for (; i < count; i++) {
				//console.log(gauss(9.3, 1.24));
				listsList.push(wordsArray(gauss(9.3, 1.24), false, startWithLorem));
				startWithLorem = false;

				if(!run){break;}
		}

		listsList = punctuate(listsList);

		return output(listsList, tags, array, "\n\n");
	}
	function byte(tags) {
		tags = tags || false;
		return bytes(1,tags);
	}
	function bytesArray(count, tags, swl) {
		count = count || 1;
		tags = tags || false;
		startWithLorem = swl || false;

		return bytes(count, tags, startWithLorem, true);
	}
	function bytes(count, tags, swl, array) {
		count = count || 1;
		tags = tags || false;
		startWithLorem = swl || false;
		array = array || false;

		var bytesList = [],
			bytesString = "",
			secondLastElem = "",
			lastElem = "",
			letterCount = 0;

		run = true;

		//keep adding sentences till bytes count met
		while(letterCount<count && run) {

				bytesList.push(sentences(1,false,startWithLorem));
				startWithLorem = false;
				letterCount += bytesList[bytesList.length-1].length;
		}

		bytesString = bytesList.join(" ");

		if(bytesString.length>count) {

			bytesString = bytesString.substr(0,count);


			if(bytesString.charAt(bytesString.length-1)===" ") {
					bytesString = bytesString.substr(0,bytesString.length-1) + "s";
			}

			bytesList = bytesString.split(" ");

			lastElem = bytesList[bytesList.length-1];

			if(bytesList[bytesList.length-2]) {
				secondLastElem = bytesList[bytesList.length-2];
				if(lastElem.length<3 && secondLastElem.length<10) {

					lastElem = wordOfLength(parseInt(secondLastElem.length)+parseInt(lastElem.length)) + ".";

					bytesList.pop();
				}
			}

			if(lastElem.charAt(lastElem.length-1)!=="." && bytesString.length>2) {
				lastElem = lastElem.substr(0,lastElem.length-1) + ".";
			}
			bytesList[bytesList.length-1] = lastElem;

		}

		return output(bytesList, tags, array);

	}

	function wordOfLength(count) {
		//get random word of length
		var pos = randomNumber(0,dictionary.length-1),
		word = "",
		i = 0;
		if(count===1) {
			return "a";
		}
		if(count>0) {
			while(word.length!==count) {

				word = dictionary[pos];
				//console.log(word);
				pos++;
				if(pos>dictionary.length-1) {
					pos = 0;
					i++;
					if(i>1) {
						count -= 1;
					}
				}
			}
		}


		return word;
	}
	function randomNumber(min,max) {
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	function defaultTo(value, defaultValue) {
		return isNaN(value) ? defaultValue : value;
	}

	function gauss(mean, standardDeviation) {

		mean = defaultTo(mean, 0.0);
		standardDeviation = defaultTo(standardDeviation, 1.0);

		var v1, v2, s, multiplier;
		do {
		   v1 = 2 * Math.random() - 1; // between -1 and 1
		   v2 = 2 * Math.random() - 1; // between -1 and 1
		   s = v1 * v1 + v2 * v2;
		} while (s >= 1 || s == 0);
		multiplier = Math.sqrt(-2 * Math.log(s) / s);

		return (v1 * multiplier * standardDeviation) + mean;

 	}
	/*
	function wordShuffle() {

		if (startWithLorem) {
			startWithLorem = dictionary.slice(0,8);
			dictionary = dictionary.slice(8);

			arrayShuffle(dictionary);

			dictionary = startWithLorem.concat(dictionary);

			startWithLorem = false;
		} else {


			arrayShuffle(dictionary);
		}
	}*/

	function arrayShuffle (array) {
		var i = 0,
			j = 0,
			temp = null;

		for (i = array.length - 1; i > 0; i -= 1) {
			j = Math.floor(Math.random() * (i + 1));
			temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}

	function sentencise(wordList) {
		var end = Math.min(Math.round(gauss(24.46, 5.08)),wordList.length),
			begin = 0,
			count = 0,
			sentences = [],
			z = 0;

		if(wordList.length<1) {return [];}
		wordList[0] = wordList[0].charAt(0).toUpperCase() + wordList[0].slice(1);

		//console.log(wordList,wordList.length);
		while(begin<wordList.length) {

				//console.log("start",begin,end);
				if(wordList.length!==end && wordList.length-end<6) {
					end = wordList.length;
					//console.log("adjust",end);
				}
				sentences[z] = wordList.slice(begin,end);

				begin = end;

				z++;

				end = Math.min(begin+Math.round(gauss(24.46, 5.08)),wordList.length);

				//console.log("end",begin,end);

		}
		sentences = punctuate(sentences);

		//console.log(sentences);

		return sentences;

	}

	function punctuate(sentences) {
		var z = 0,
			words = 0,
			mean,
			std_dev,
			commas,
			i,
			word;

		for(;z < sentences.length; z++) {
			words = sentences[z].length;

			if (words > 4) {
				mean = Math.log(words) / Math.log(6);
				std_dev = mean / 6;
				commas = Math.round(gauss(mean, std_dev));

				for (i = 1; i <= commas; i++) {
					word = Math.round((i * words) / (commas + 1));

					if (word < (words - 1) && word > 0) {
						sentences[z][word] += ',';
					}
				}
			}

			sentences[z] = sentences[z].join(" ") + '.';
			sentences[z] = sentences[z].charAt(0).toUpperCase() + sentences[z].slice(1);

		}

		return sentences;
	}

	function kill() {
		run = false;
	}
	function handleDataAttr($) {
		var elems = $("[data-getlorem]"),
			count = 0,
			output = "";

		elems.each(function() {
			count = parseInt($(this).data("getlorem"));

			output = words(count);

			$(this).text(output);
		});
	}
	function output(strings, tags, array, delimiter) {
		delimiter = delimiter || " ";

		if (tags) {

			if (!Array.isArray(tags)) {
				tags = [tags];
			} else {
				tags.reverse();
			}
			var i = 0,
				z;
			for (;i < strings.length;i++) {
				for (z = 0;z < tags.length;z++) {
					strings[i] = "<"+tags[z]+">" + strings[i] + "</"+tags[z]+">";

				}
			}
		}

		if (!array) {
			strings = strings.join(delimiter);
		}

		return strings;
	}
	if('undefined' !== typeof self) {
		self.addEventListener('message', function(e) {
			var data = e.data,
				cmd = data.cmd || "words",
				count = data.count || 5,
				tags = data.tags || false,
				swl = data.swl || false,
				output = "";

			kill();

			switch(cmd) {
				case "words":
					output = words(count,tags,swl);
					break;
				case "sentences":
					output = sentences(count,tags,swl);
					break;
				case "paragraphs":
					output = paragraphs(count,tags,swl);
					break;
				case "lists":
					output = lists(count,tags,swl);
					break;
				case "bytes":
					output = bytes(count,tags,swl);
					break;
			}

		  self.postMessage({output:output,cmd:cmd});

		}, false);
	}
	if('undefined' !== typeof jQuery) {
		//jQuery bit here
		handleDataAttr(jQuery);
	}

	var generator = function() {
		return {
			word:word,
			wordsArray:wordsArray,
			words:words,
			sentence:sentence,
			sentencesArray:sentencesArray,
			sentences:sentences,
			paragraph:paragraph,
			paragraphsArray:paragraphsArray,
			paragraphs:paragraphs,
			list:list,
			listsArray:listsArray,
			lists:lists,
			byte:byte,
			bytesArray:bytesArray,
			bytes:bytes,
			kill:kill
		};
	}();
	window.getlorem = generator;
	return generator;
}));
