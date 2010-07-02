exports.caseInsensitiveSort = function(a, b) {
    var x = a.toLowerCase();
    var y = b.toLowerCase();

    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
};

