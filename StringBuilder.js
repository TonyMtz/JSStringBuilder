/*
 * String Builder script for Javascript
 * 
 * Coded by TonyMtz
 *  http://developx.org
 * 
 */

(function(param) {
    
    /*
     * Ready to start? you can create a new instance of StringBuilder object
     * with all the concatenation methods:
     * 
     * var sb = new StringBuilder();
     * 
     */

    var StringBuilder = function() {
        this.buffer = [], // Buffer where all strings will be saved
                this.pref = [], // Buffer where all prefixes will be saved
                this.suff = [], // Buffer where all suffixes will be saved
                this.pause = {}; // Empty object used on suspend method
        },
        emptyArray = [], // Empty array frequently used like default value
        emptyFunction = function() {}, // Empty array frequently used like default value
        is_array = function(value) {
            return Object.prototype.toString.apply(value) === '[object Array]';
        }, // Function wich returns if the param is an array
        is_function = function(value) {
            return typeof(value) === 'function';
        }, // Function wich returns if the param is a function
        slice = Array.prototype.slice;

    StringBuilder.prototype = {
        /*
         * This is for internal purposes only. It's better do not use it.
         */
        push: function() {
            var args = slice.call(arguments),
                    len = args.length,
                    i,
                    value;

            for (i = 0; i < len; i += 1) {
                value = args[i];
                if (is_function(value)) {
                    this.push(value.apply(this));
                } else if (is_array(value)) {
                    this.push.apply(this, value);
                } else {
                    this.buffer.push(value);
                }
            }
        },
        /*
         * cat(arg1, arg2,..., argN)
         * 
         * Allows the addition of one or many strings to the buffer, can receive
         * functions wich return arrays, strings or numbers; arrays or nested
         * functions and arrays. i.e.
         * 
         * var sb = new StringBuilder();
         * sb.cat('hello');
         * sb.cat(' Javascript',' crazy',' world').cat(' !!!');
         * 
         */
        cat: function() {
            var args = slice.call(arguments), // converts arguments into a array
                    len = this.pref.length,
                    i, // helps to point in suff array
                    j = len - 1; // helps to point in pref array inversely

            for (i = 0; i < len; i += 1) {
                if (this.pref[j] === this.pause) {
                    break;
                }
                args.splice(0, 0, this.pref[j]);
                args.push(this.suff[i]);
                j -= 1;
            }
            this.push(args);
            return this;
        },
        /*
         * rep(arg1, arg2,..., argN, howManyTimes)
         * 
         * This method concatenates the same string a given number of times. i.e.
         * 
         * var sb = new StringBuilder();
         * sb.cat('Mom, can you').rep(' please', 10).cat(' buy me an ice cream');
         * 
         */
        rep: function() {
            var args = slice.call(arguments), // converts arguments into a array
                    times = args.pop(), // pop how many times
                    i;
            for (i = 0; i < times; i += 1) {
                this.cat.apply(this, args);
            }
            return this;
        },
        /*
         * catIf(arg1, arg2,..., argN, flag)
         * 
         * This will perform the string concatenation only if the flag is true.
         * The last argument of this method must be a boolean testable value
         * that will indicate if the given strings shall be added or not.
         * 
         * var sb = new StringBuilder();
         * sb.cat('Hello')
         *     .catIf(' pretty',' lady!', sex === 'f')
         *     .catIf(' gentleman!', sex === 'm')
         *     .catIf(' and', ' good', 'bye!', !sex);
         * 
         */
        catIf: function() {
            var args = slice.call(arguments); // converts arguments into a array
            if (args.pop()) {
                this.cat.apply(this, args);
            }
            return this;
        },
        /*
         * string()
         * 
         * This method will return a concatenated string of all the parameters
         * that we have given our object. i.e.
         * 
         * var sb = new StringBuilder();
         * sb.cat('hello',' world,'!');
         * console.log(sb.string());
         * 
         * In this case, the method shall return the 'hello world!' string.
         * 
         */
        string: function() {
            return this.buffer.join('');
        },
        /*
         * wrap([prefix], [suffix])
         * 
         * Everything you add to StringBuilder after this method is called will
         * be surrounded by the prefix and suffix arguments. The prefix and
         * suffix arguments could be any supported type (string, function to be
         * called, any object that will be evaluated against toString() method)
         * or an array containing a list of any supported type.
         * 
         * var sb = new StringBuilder();
         * sb.cat('<ul>', '\n')
         *     .wrap('<li>', ['</li>', '\n'])
         *     .rep('list item', 10)
         *     .cat('</ul>');
         * 
         */
        wrap: function(prefix, suffix) {
            this.pref.push(prefix);
            this.suff.splice(0, 0, suffix);
            return this;
        },
        /*
         * end(deep)
         * 
         * This method is intended to cancel the current or last "effect" or
         * "decorator" that were added to the StringBuilder by calling any of
         * the following methods: wrap, prefix and suffix.
         * 
         * The not required deep parameter will allow you to cancel more than
         * one effect, they work as an stack, so it will just pop the last deep
         * pushed effects or only the last one if deep is null or undefined.
         * 
         */
        end: function(deep) {
            deep = deep || 1;
            for (var a = 0; a < deep; a += 1) {
                this.pref.pop();
                this.suff.splice(0, 1);
            }
            return this;
        },
        /*
         * prefix(arg1, arg2,..., argN)
         * 
         * As it happened with the wrap method, everything added after calling
         * this method shall be prefixed with the specified arguments.
         * 
         * var sb = new StringBuilder();
         * sb.cat('Todo list: \n')
         *      .prefix('  - ')
         *      .cat('first thing to do\n')
         *      .cat('second thing to do\n')
         *      .cat('third thing to do\n');
         *  
         *  And you will get the following output.
         *  
         *  Todo list:
         *    - first thing to do
         *    - second thing to do
         *    - third thing to do
         * 
         */
        prefix: function() {
            return this.wrap(slice.call(arguments), emptyArray);
        },
        /*
         * suffix(arg1, arg2,..., argN)
         * 
         * It is almost the same as prefix. Now we can change our todo list to
         * avoid adding the ugly \n after each cat call.
         * 
         * var sb = new StringBuilder();
         * sb
         *      .suffix('\n')
         *      .cat('Todo list:')
         *      .prefix('  - ')
         *      .cat('first thing to do')
         *      .cat('second', ' thing', ' to do')
         *      .cat('third thing to do');
         *      
         */
        suffix: function() {
            return this.wrap(emptyArray, slice.call(arguments));
        },
        /*
         * each([args], callback)
         * 
         * This is a utility method that will allow the iteration over an array
         * of values without breaking the cascade or chain. It shall to iterate
         * over each value on the array and then call the callback function. The
         * each method will call the callback setting the context (this)
         * reference to the StringBuilder and will send three parameters value,
         * index and the given args array itself.
         * 
         * var   sb = new StringBuilder(),
         *      people = [
         *          { name: 'pedro', sex: 'm', age: 30 },
         *          { name: 'leticia', sex: 'f', age: 21 },
         *          { name: 'pablo', sex: 'm', age: 20 }
         *      ];
         * sb
         *      .cat('<table>')
         *      .prefix('  ')
         *      .cat('<thead><tr><th>Name</th><th>Sex</th><th>Age</td></thead>')
         *      .cat('<tbody>')
         *      .prefix('  ')
         *      .each(people, function(value, index, thePeople){
         *          this
         *              .cat('<tr>')
         *              .prefix('  ')
         *              .cat('<td>', value.name, '</td>')
         *              .cat('<td>', value.sex, '</td>')
         *              .cat('<td>', value.age, '</td>')
         *              .end()
         *              .cat('</tr>');
         *      })
         *      .end()
         *      .cat('</tbody>')
         *      .end()
         *      .cat('</table>');
         *      
         */
        each: function(args, callback) {
            args = (is_array(args)) ? args : emptyArray;
            callback = (is_function(callback)) ? callback : emptyFunction;
            var len = args.length,
                    i;
            for (i = 0; i < len; i += 1) {
                callback.call(this, args[i], i, args);
            }
            return this;
        },
        /*
         * suspend()
         * 
         * The call to this method must "suspend" or "pause" the applied effects
         * (prefix(), suffix() and wrap()) and it's influence will finish with
         * the call to end() method by restoring the previously added effects.
         * This would be useful if you want to append a large amount of text and
         * you want to temporarily turn off the effects you've already configured.
         * 
         */
        suspend: function() {
            return this.wrap(this.pause, this.pause);
        },
        /*
         * when(expression, thenArgs, otherwiseArgs)
         * 
         * This method must evaluate the expression and call the cat() method
         * with the thenArgs or otherwiseArgs depending on the result of
         * evaluation. If the expression is a function then if must be called
         * and its result will be used to determine the path to choose.
         * 
         */
        when: function(expression, thenArgs, otherwiseArgs) {
            return (expression) ?
                    this.cat.call(this, thenArgs) :
                    this.cat.call(this, otherwiseArgs);
        }
    };

    param.StringBuilder = StringBuilder;
})(exports || this);