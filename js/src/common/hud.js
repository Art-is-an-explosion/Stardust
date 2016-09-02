/**
 * Created by shinate on 16/9/2.
 */

define(['jquery', 'DD'], function ($, DD) {

    var HUD = $('.hud');
    var HUDLeft = HUD.find('.hud-left');
    var HUDTop = HUD.find('.hud-top');
    var HUDRight = HUD.find('.hud-right');
    var HUDBottom = HUD.find('.hud-bottom');

    return function hud() {

        $('.main').on('click', '.logo', function () {
            hide();
        });

        $('.main').on('click', '.star', function () {
            console.log($(this));
            show();
        });

        var name = arguments.callee.name;

        function show(cb) {
            DD(name + '.show');

            HUD.show();

            HUDLeft.animate({
                left: 0,
                opacity: 1
            }, 800, 'swing');

            HUDRight.animate({
                right: 0,
                opacity: 1
            }, 800, 'swing');

            HUDBottom.animate({
                bottom: 0,
                opacity: 1
            }, 800, 'swing');

            HUDTop.animate({
                top: 0,
                opacity: 1
            }, 800, 'swing', function () {
                DD(name + '.show');
                cb && cb.call && cb();
            });

        }

        function hide(cb) {
            DD(name + '.hide');
            HUDLeft.animate({
                left: -400,
                opacity: 0
            }, 800, 'swing');

            HUDRight.animate({
                right: -400,
                opacity: 0
            }, 800, 'swing');

            HUDBottom.animate({
                bottom: -360,
                opacity: 0
            }, 800, 'swing');

            HUDTop.animate({
                top: -360,
                opacity: 0
            }, 800, 'swing', function () {
                DD(name + '.hide');
                cb && cb.call && cb();

                HUD.hide();
            });


        }

        return {
            show: show,
            hide: hide
        }
    }
});