require('./home.less');

module.exports = {
    template: require('./home.tpl.html'),

    init: function () {
        console.log('init home module');

        var myHome = angular.module('myHome', []);


        myHome.controller('demo', [function(){
            var that = this;
            that.click = function(){
                that.status += 1;
            };
            that.status = 0;
            return that;
        }]);


    }
};