var O2String = function (O) {
    //return JSON.stringify(jsonobj);
    var S = [];
    var J = "";
    if (Object.prototype.toString.apply(O) === '[object Array]') {
        for (var i = 0; i < O.length; i++)
            S.push(O2String(O[i]));
        J = '[' + S.join(',') + ']';
    }
    else if (Object.prototype.toString.apply(O) === '[object Date]') {
        J = "new Date(" + O.getTime() + ")";
    }
    else if (Object.prototype.toString.apply(O) === '[object RegExp]' || Object.prototype.toString.apply(O) === '[object Function]') {
        J = O.toString();
    }
    else if (Object.prototype.toString.apply(O) === '[object Object]') {
        for (var i in O) {
            O[i] = typeof (O[i]) == 'string' ? '"' + O[i] + '"' : (typeof (O[i]) === 'object' ? O2String(O[i]) : O[i]);
            S.push(i + ':' + O[i]);
        }
        J = '{' + S.join(',') + '}';
    }
    return J;
};

