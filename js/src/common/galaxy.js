define(['jquery', 'bucket', 'DD', 'lib/gaussian'], function ($, bucket, DD, gaussian) {

    var distributed = gaussian(0.8, 1);

    var plantDefault = {
        'size': 5
    };

    var ecliptic = {
        radius: 50 // vmin
    };

    return function galaxy() {

        var name = arguments.callee.name;

        var el = $('.galaxy');
        var groups = el.find('.groups');

        var planetData = [];

        function show(cb) {
            DD(name + '.show');
            el.fadeIn(1000, function () {
                DD(name + '.show');
                cb && cb.call && cb();
            });
        }

        function hide(cb) {
            DD(name + '.show');
            el.fadeOut(1000, function () {
                DD(name + '.show');
                cb && cb.call && cb();
            });
        }

        function change(cb) {
            DD(name + '.show');
            el.fadeIn(1000, function () {
                DD(name + '.show');
                cb && cb.call && cb();
            });
        }

        function load() {
            $.get('data/galaxy.json', function (ret) {
                console.log(name + '.load', planetData);
                if (ret.length) {
                    ret.forEach(groupRender);
                }
            });
        }

        function createDistributed(num, area) {
            var posList = [];

            // var step = Math.PI * 2 / num;
            // var angle, radius;
            // for (var i = 0, len = num; i < len; i++) {
            //     angle = i * step + (Math.random() * 100 * 2 * Math.PI % step) - (step / 2)
            //     radius = area + (Math.random() * area * 100 % area - (area / 2));
            //     posList.push({
            //         angle: angle,
            //         radius: radius
            //     });
            // }

            var x, y;
            for (var i = 0, len = num; i < len; i++) {
                x = distributed.ppf(Math.random() % 0.5) * area;
                y = distributed.ppf(Math.random() % 0.5) * area;
                posList.push({
                    x: x,
                    y: y
                });
            }

            return posList;
        }


        function groupRender(gdata) {
            var radian = (gdata.angle || 0) / 180 * Math.PI;
            var radius = gdata.rudius || 100;
            var radiation = gdata.radiation || 100;

            var x = Math.cos(radian) * (radius / 100) * ecliptic.radius;
            var y = Math.sin(radian) * (radius / 100) * ecliptic.radius;

            console.log(x, y);

            var group = $('<div class="group"></div>').appendTo(groups)
                .css({
                    'transform': 'translate3d(' + x + 'vmin, ' + y + 'vmin, 0)',
                });

            if (gdata.planets && gdata.planets.length) {

                var distributed = createDistributed(gdata.planets.length, radiation);

                gdata.planets.forEach(function (pdata, i) {
                    var star = planetRender();
                    var starEntity = star.find('.star-entity');
                    var starBlink = star.find('.star-blink');

                    var size = plantDefault.size * (pdata.size || 1);

                    star.data('source', pdata.source || 'default');

                    $('<em></em>').text(pdata.name || '').appendTo(starEntity);

                    star.css({
                        height: size,
                        width: size,
                        'margin-left': -size / 2,
                        'margin-top': -size / 2,
                        '-webkit-transform': 'translate3d(' + distributed[i].x + 'px, ' + distributed[i].y + 'px, 0)',
                        '-moz-transform': 'translate3d(' + distributed[i].x + 'px, ' + distributed[i].y + 'px, 0)',
                        '-ms-transform': 'translate3d(' + distributed[i].x + 'px, ' + distributed[i].y + 'px, 0)',
                        '-o-transform': 'translate3d(' + distributed[i].x + 'px, ' + distributed[i].y + 'px, 0)',
                        'transform': 'translate3d(' + distributed[i].x + 'px, ' + distributed[i].y + 'px, 0)'
                    });

                    starEntity.css({
                        'background-color': pdata.color || '#FFFFFF',
                        'box-shadow': '0 0 2px 2px ' + pdata.color || '#FFFFFF'
                    });

                    var delay = (Math.random() * 15) + 's';

                    starBlink.css({
                        '-webkit-animation-delay': delay,
                        '-moz-animation-delay': delay,
                        '-o-animation-delay': delay,
                        'animation-delay': delay
                    });

                    group.append(star);
                });
            }
        }

        function planetRender() {
            return $(
                '<div class="star">' +
                '<div class="star-entity"></div>' +
                '<div class="star-blink"><div></div></div>' +
                '</div>'
            );
        }

        function init() {
            load();
        }

        init();

        return {
            show: show,
            hide: hide,
            change: change
        }
    }

});