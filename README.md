#getlorem

This library can be used as a Node module as well as a being included as a standalone script on a page via Require.js or in a script tag.



##Installing the module (Node.js)

```
npm install getlorem
```

Require getlorem and use it to generate a passage of lorem ipsum text.

```
var getlorem = require('getlorem');

var output = getlorem.paragraphs(5);
```



##Usage

###Generating words

```
getlorem.words(5);
```

###Generating sentences

```
getlorem.sentences(5);
```

###Generating paragraphs

```
getlorem.paragraphs(5);
```

###Generating lists

```
getlorem.lists(5);
```

###Generating bytes

```
getlorem.bytes(5);
```



##Wrapping text with HTML tags

If you would like to wrap the generated text with a tag, pass it as the second parameter.

```
getlorem.paragraphs(5,'p');

// Generates: <p>Lorem ipsum...</p><p>...</p><p>...</p>
```



## Starting with 'Lorem ipsum...'

To generate a passage of text that begins with the opening 'Lorem ipsum…' sentence. Set the third parameter to true.

```
getlorem.paragraphs(4,'p',true);
```



##Using the CLI (Node.js)

getlorem can be used from the command line. To do this, install it globally.

```
npm install getlorem --global
```

Execute the statement `getlorem` to generate lorem ipsum  text.

```
getlorem --units words --count 200 --copy
```

Refine the output with the following arguments.

| Argument | Description                              |
| -------- | ---------------------------------------- |
| --units  | Generate words, sentences, paragraphs, lists, bytes |
| —count   | The number of unites to be generated     |
| —copy    | Copy to clipboard                        |
| —tags    | HTML tags to wrap the units              |
| —swl     | Start with 'lorem ipsum...'              |

