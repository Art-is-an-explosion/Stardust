/**
 * Created by shinate on 16/9/1.
 */

define(function (require, exports, module) {


    var queue = require('queue');

    var bucket = require('bucket');
    var handle = bucket.__HANDLE__;

    var loadData = require('action/loadData');
    var loadResource = require('action/loadResource');

    var mask = require('common/mask')();
    var mainIcon = require('common/mainIcon')();
    var stage = require('common/stage');

    var DD = require('DD');

    function start() {
        DD('faceQueue ====================');
        dataQueue();
    }

    function dataQueue() {
        new queue()
            .defer(mask.show)
            .defer(mainIcon.show)
            .defer(loadData)
            .awaitAll(function () {
                console.log(1);
                resourceQueue();
            });
    }

    function resourceQueue() {
        new queue()
            .defer(loadResource)
            .awaitAll(function () {
                setTimeout(function () {
                    stageRenderQueue();
                }, 3500);
            });
    }

    function stageRenderQueue() {
        handle.stage = stage();
        new queue()
            .defer(handle.stage.start)
            .defer(mask.hide)
            .awaitAll(function () {
                showExtra();
            });
    }

    function showExtra() {
        new queue()
            .defer(mainIcon.showBtns)
            .awaitAll(function () {
                DD('faceQueue ====================');
            });
    }

    return start;

});