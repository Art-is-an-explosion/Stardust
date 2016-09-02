define(['jquery', 'DD'], function ($, DD) {

    var el = $('.mask');

    return function mask() {

        var name = arguments.callee.name;

        function show(cb, delay) {
            DD(name + '.show');
            el.fadeIn(delay || 1000, function () {
                DD(name + '.show');
                cb && cb.call && cb();
            });
        }

        function hide(cb, delay) {
            DD(name + '.hide');
            el.fadeOut(delay || 1000, function () {
                DD(name + '.hide');
                cb && cb.call && cb();
            });
        }

        return {
            show: show,
            hide: hide
        }
    };
});