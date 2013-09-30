/*
* HTip Tool Tip
* By Hamid Raza
* http://www.hamidraza.com/
*/

(function($) {
    "use strict";
    
    $.fn.htip = function(options) {
        var opts = $.extend( {}, $.fn.htip.defaults, options );

        return this.each(function() {

            var that = this,
                $this = $(this),
                $thisData = {};

            for(var i in $this.data()){
                var dataAr = i.split(/(?=[A-Z])/).map(function(v){ return v.toLowerCase() });
                if(dataAr.splice(0,1)[0] === 'htip'){
                    $thisData[dataAr.join('-')] = $this.data(i);
                }
            }
            var settings = $.extend( {}, opts, $thisData );
            var $title = settings.title || $this.attr('title');

            var titleEle = $('<div></div>',{
                'class':'htip',
                'html': $title,
                'css': {
                    'position': 'absolute',
                    'z-index': '999999',
                    'display': 'none'
                }
            }).appendTo('body');

            titleEle.addClass(settings['class']);

            $this.on('mousemove', function(e){
                titleEle.css({
                    'display': 'block'
                });

                var width = titleEle.outerWidth();
                var height = titleEle.outerHeight();

                titleEle.css({
                    'left': ($(this).offset().left)-(width/2),
                    'top': ($(this).offset().top)-height
                });
            }).on('mouseout', function(){
                titleEle.css('display', 'none');
            });


        });
        
    };

})(jQuery);

$.fn.htip.defaults = {};

