var home = require('./home/home.js');

$(document).ready(function(){
    //home.init();
    //$('.main').append(home.template);
    new Vue({
        el: '#vuemain',
        data: {
            name: 'vue test'
        },
        ready: function(){
            console.log('vue object ready!');
        },
        components: {
            'vue-home': require('./vuehome/vuehome.js')
        }
    });
});
