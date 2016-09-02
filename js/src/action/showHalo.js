define(['DD'], function (DD) {

    return function showHalo(cb) {
        var name = arguments.callee.name;
        DD(name);
        var halo = $('.halo');

        halo.show();

        setTimeout(function () {
            halo.find('.halo-small').fadeIn(1000);
        }, 300);

        setTimeout(function () {
            halo.find('.halo-big').fadeIn(1000, function () {
                DD(name);
                cb && cb.call && cb();
            });
        }, 1200);
    }
});