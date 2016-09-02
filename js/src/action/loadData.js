define(['jquery', 'bucket', 'DD'], function ($, bucket, DD) {

    var resource = bucket.__RESOURCE__;

    return function loadData(cb) {
        var name = arguments.callee.name;
        DD(name);
        $.get('data/resource.json', function (ret) {
            resource.originImages = ret.images;
            console.log(resource.originImages);
            DD(name);
            cb && cb.call && cb();
        });
    }
});