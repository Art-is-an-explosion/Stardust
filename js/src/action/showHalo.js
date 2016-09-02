define(['DD'], function (DD) {

    return function showHalo(cb) {
        var name = arguments.callee.name;
        DD(name);
        $('.halo').fadeIn(1000, function () {
            DD(name);
            cb && cb.call && cb();
        });
    }
});