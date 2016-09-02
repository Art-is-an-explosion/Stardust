define(function () {
    var _C = {};
    return function (name) {
        if (_C[name] == null) {
            _C[name] = +new Date;
            console.log(name + ' >>>');
        } else {
            console.log(name + ' <<< [' + (+new Date - _C[name]) + 'ms]');
        }
    }
});