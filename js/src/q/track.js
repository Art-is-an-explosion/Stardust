/**
 * Created by shinate on 16/9/1.
 */

define(function (require, exports, module) {

    var queue = require('queue');

    var bucket = require('bucket');
    var handle = bucket.__HANDLE__;
    var showHalo = require('action/showHalo');
    var galaxy = require('common/galaxy');
    var mainIcon = require('common/mainIcon');

    var DD = require('DD');

    function start() {
        DD('trackQueue ====================');
        switchQueue();
    }

    function switchQueue() {
        handle.galaxy = galaxy();
        handle.mainIcon = mainIcon();
        new queue()
            .defer(handle.mainIcon.hide)
            .defer(showHalo)
            .defer(handle.galaxy.show)
            .awaitAll(function () {
                DD('trackQueue ====================');
            });
    }

    return start;

});