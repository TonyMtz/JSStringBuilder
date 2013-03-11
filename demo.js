/*
 * String Builder demo script
 * 
 * Coded by TonyMtz
 * 
 */

//  How-to-use
//  Firstly we will import the file and create a new object

var StringBuilder = require('./StringBuilder.Min.js').StringBuilder,
    sb = new StringBuilder();

console.log('======\nExample #01');

//  Now we will concat many string to the buffer with cat method, StringBuilder
//  object support the cascade or chaining pattern...

sb.cat('hello');
sb.cat(' Javascript', ' crazy', ' world').cat('!!!');

//  and we can see all the concatenated strings calling the string method...

console.log(sb.string());

//  This print "hello Javascript crazy world!!!"

console.log('======\nExample #02');

//  We can send functions to cat method too, these functions will be called by
//  the cat method and its return value will be added to the buffer instead of
//  the function itself

sb = new StringBuilder();

sb
    .cat('This is the first', ' line', '\n')
    .cat('here is the second', '\n')
    .cat('and then', ' the third...', '\n')
    .cat('now',
        function() {
            return ' we can make some calcs';
        },
        ' here');

console.log(sb.string());

console.log('======\nExample #03');

//  The cat method supports a list of arguments which are expected to be
//  strings, functions (which will be called inside the cat method and the
//  return value will be pushed to the buffer) and any other kind of object
//  that will be evaluated using the toString() method.

sb = new StringBuilder();

sb
    .cat('this', [' is', ' a', ' string'], ' in the')
    .cat(' array', ' :-)');

console.log(sb.string());

console.log('======\nExample #04');

sb = new StringBuilder();

sb
    .cat('this',
        [
            ' is',
            function() {
                return [' a', ' function that',' returns an array'];
            }
        ],
        ' ;)');

console.log(sb.string());

//  ...and so on.

console.log('======\nExample #05');

//  You can use rep method to concatenate the same string a given number of times.

sb = new StringBuilder();

sb
    .cat('Mom, can you')
    .rep(' please', 10)
    .cat(' buy me an ice cream');
    
console.log(sb.string());

//  As you can see this method can be very useful to annoy your mom.

console.log('======\nExample #06');

//  Maybe you will need perform the string concatenation only if a constraint is
//  satisfied. You can use catIf method. The last argument of this method must
//  be a boolean testable value that will indicate if the given strings shall be
//  added or not.

sb = new StringBuilder(), sex = 'f';

sb
    .cat('Hello')
    .catIf(' sexy', ' lady!', sex === 'f')
    .catIf(' gentleman!', sex === 'm')
    .catIf(' and', ' good', 'bye!', !sex);

console.log(sb.string());

console.log('======\nExample #07');

//  Also you can surround with a prefix and suffix your strings.

sb = new StringBuilder();

sb
    .cat('<ul>', '\n')
    .wrap('<li>', ['</li>', '\n'])
    .rep('list item', 10)
    .cat('</ul>');

console.log(sb.string());

console.log('======\nExample #08');

//  If you run the app, you should see how the last item looks ugly, this can be
//  fixed using the end method to stop using the last effect of wrap method

sb = new StringBuilder();

sb
    .cat('<ul>', '\n')
    .wrap('<li>', ['</li>', '\n'])
    .rep('list item', 10)
    .end()
    .cat('</ul>');

console.log(sb.string());

console.log('======\nExample #09');

//  This method also support functions as parameters, like on the following script

sb = new StringBuilder();

sb
    .suffix('\n')
    .cat('<ul>')
    .prefix('  ')
    .wrap(
        [
            '<li>',
            function() {
                var count = 0;
                return function() {
                    return count += 1;
                };
            }(),
            '.- '
        ],
        '</li>')
    .rep('list item', 5)
    .end(2)
    .cat('</ul>');

console.log(sb.string());

//  Wait, wait, wait... What the heck are suffix, prefix and end(2) methods?
//  easy, suffix and prefix add suffixes and prefixes to our concatenations
//  and can use the method end with a parameter to cancel more than one effect.

console.log('======\nExample #10');

//  The next method is the each, and that will allow the iteration over an array
//  of values without breaking the cascade or chain. It will iterate over each
//  value on the array and then call the callback function setting the context
//  (this) reference to the StringBuilder and will send three parameters value,
//  index and the given args array itself.

sb = new StringBuilder(),
    people = [
        {name: 'pepe', sex: 'm', age: 20},
        {name: 'claudia', sex: 'f', age: 21},
        {name: 'tony', sex: 'm', age: 22}
    ];

sb
    .suffix('\n')
    .cat('<table>')
    .prefix('  ')
    .cat('<thead><tr><th>Name</th><th>Sex</th><th>Age</td></thead>')
    .cat('<tbody>')
    .prefix('  ')
    .each(
        people,
        function(value, index, thePeople) {
            this
                .cat('<tr>')
                .prefix('  ')
                .cat('<td>', value.name, '</td>')
                .cat('<td>', value.sex, '</td>')
                .cat('<td>', value.age, '</td>')
                .end()
                .cat('</tr>');
        })
    .end()
    .cat('</tbody>')
    .end()
    .cat('</table>');

console.log(sb.string());

console.log('======\nExample #11');

// Finally, the when method evaluate the expression and call the cat() method
// with the thenArgs or otherwiseArgs depending on the result of evaluation.
// If the expression is a function then if must be called and its result will
// be used to determine the path to choose.

sb = new StringBuilder(),
    people = [
        {name: 'pepe', sex: 'm', age: 20},
        {name: 'claudia', sex: 'f', age: 21},
        {name: 'tony', sex: 'm', age: 22}
    ];

sb
    .suffix('\n')
    .wrap('<p>', '</p>')
    .each(
        people,
        function(person) {
            this
                .when(
                    person.sex === 'm',
                    function() {
                        return person.name + ' is male';
                    },
                    [person.name, ' is female']
                );
        }
    );

console.log(sb.string());

// Now, you can run this file to see result of each example.