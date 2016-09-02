define(['jquery', 'DD'], function ($, DD) {

    var el = $('.main-icon');

    return function mainIcon() {

        var name = arguments.callee.name;

        function show(cb) {
            console.log(arguments);
            DD(name + '.show');
            el.fadeIn(1000, function () {
                DD(name + '.show');
                cb && cb.call && cb();
            });
        }

        function hide(cb) {
            console.log(arguments);
            DD(name + '.hide');
            el.fadeOut(1000, function () {
                DD(name + '.hide');
                cb && cb.call && cb();
            });
        }

        function showEnterButtons(cb) {
            DD(name + '.showEnterButtons');
            el.find('p').fadeIn(1000, function () {
                DD(name + '.showEnterButtons');
                cb && cb.call && cb();
            });
        }

        return {
            show: show,
            hide: hide,
            showBtns: showEnterButtons
        }
    };
});