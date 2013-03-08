var StringBuilder = require('./StringBuilder.js').StringBuilder;

exports.StringBuilder_Cat_ConcatString = function(test) {
    var sb = new StringBuilder(), string = 'Test String';
    test.expect(1);
    sb.cat(string);
    test.equal(sb.string(), string);
    test.done();
};

exports.StringBuilder_Rep_RepeatString = function(test) {
    var sb = new StringBuilder(), string = 'a', tmpBuffer = '';
    test.expect(3);
    sb.rep(string, 1);
    tmpBuffer += string;
    test.equal(sb.string(), tmpBuffer);
    sb.rep(string, string, 1);
    tmpBuffer += string + string;
    test.equal(sb.string(), tmpBuffer);
    sb.rep(string, 2);
    tmpBuffer += string + string;
    test.equal(sb.string(), tmpBuffer);
    test.done();
};

exports.StringBuilder_catIf_ConcatStringWhenValueIsTrue = function(test) {
    var sb = new StringBuilder(), string = 'a', tmpBuffer = '', value = false;
    test.expect(3);
    sb.catIf(string, value);
    test.equal(sb.string(), tmpBuffer);
    value = true;
    sb.catIf(string, value);
    tmpBuffer += string;
    test.equal(sb.string(), tmpBuffer);
    sb.catIf(string, string, value);
    tmpBuffer += string + string;
    test.equal(sb.string(), tmpBuffer);
    test.done();
};

exports.StringBuilder_WrapAndChaining_WrapAStringWithAnotherString = function(test) {
    var sb = new StringBuilder(), fn = function() {
        return 'a';
    },
            fn2 = function() {
        return 1 === 1;
    }, wrap = 'b', tmpBuffer = '';
    test.expect(1);
    sb.wrap(wrap, wrap).cat(fn).cat(fn).catIf(fn, fn2);
    tmpBuffer = wrap + fn() + wrap + wrap + fn() + wrap + wrap + fn() + wrap;
    test.equal(sb.string(), tmpBuffer);
    test.done();
};

exports.StringBuilder_SuffixAndPrefixAndEnd_AddASuffixAndPrefixToAString = function(test) {
    var sb = new StringBuilder(), fn = function() {
        return 'a';
    },
            fn2 = function() {
        return 'b';
    }, string = 'c', tmpBuffer = '';
    test.expect(1);
    sb.prefix(fn2).suffix(fn).cat(string).end().cat(string).end().cat(string);
    tmpBuffer = fn2() + string + fn() + fn2() + string + string;
    test.equal(sb.string(), tmpBuffer);
    test.done();
};