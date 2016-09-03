define(['bucket', 'DD', 'queue'], function (bucket, DD, queue) {

    var resource = bucket.__RESOURCE__;
    var IMAGES = resource.IMAGES = {};

    function loadIMG(name, url, cb) {
        var img = new Image();
        img.onload = function () {
            IMAGES[name] = img;
            img.onload = null;
            img = null;
            cb && cb.call && cb();
        };
        img.src = url;
    }

    return function loadResource(cb) {
        var name = arguments.callee.name;
        DD(name);
        var q = new queue();
        var imgs = resource.originImages;
        for (var i in imgs) {
            if (imgs.hasOwnProperty(i)) {
                q.defer(loadIMG, i, imgs[i]);
            }
        }
        q.awaitAll(function () {
            DD(name);
            cb && cb.call && cb();
        });
    };
});