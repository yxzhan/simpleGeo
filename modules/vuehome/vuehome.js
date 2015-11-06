require('./vuehome.less');

module.exports = {
    template: require('./vuehome.tpl.html'),
    data: function(){
        return {
            timer: null,
            title: 'VUE Module',
            message: '',
            secret: 'The secret variable',
            edge: 1460,
            deviation: 30,
            displaySize: 0,
            calRotate: 0
        }
    },
    ready: function(){
        var w = $(document).width()*0.6 + 'px';
        this.displaySize = {
            width:  w,
            height: w
        }
    },
    methods: {
        cleanInput: function(){
            $('.editor').val('');
        }
    },
    watch: {
        edge: function(){
            this.deviation = 0;
        },
        deviation: function(){
            var that = this;
            if(that.timer){
                clearTimeout(that.timer);
            }
            that.timer = setTimeout(function(){
                that.calRotate = {
                    transform: 'rotate('+ that.calAngle +'deg)'
                };
            },200);
        }
    },
    computed: {
        'fullContent': function(){
            return this.title + this.message;
        },
        'calAngle': function(){
            //if(this.deviation > this.maxDeviation){
            //    return '无法计算旋转角度，偏离值不能超过'+ this.maxDeviation;
            //}
            function angle (a, d) {
                return 45 - Math.acos( Math.sqrt(2)/2 + Math.sqrt(2)*d/a ) * (180/Math.PI);
            }
            return angle(Number(this.edge), Number(this.deviation));
        },
        maxDeviation: function(){
            return  ( Math.sqrt(2) - 1 ) * this.edge / 2
        }
        //calRotate: function(){
        //    return {
        //        transform: 'rotate('+ this.calAngle +'deg)'
        //    };
        //}
    }
};