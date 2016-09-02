define(['jquery', 'DD'], function ($, DD) {

    var el = $('.mask');

    return function mask() {

        var name = arguments.callee.name;

        function show(cb) {
            DD(name + '.show');
            el.fadeIn(1000, function () {
                DD(name + '.show');
                cb && cb.call && cb();
            });
        }

        function hide(cb) {
            DD(name + '.hide');
            el.fadeOut(1000, function () {
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