/****************************************************************************
	bootstrap-popover-extensions.js, 

	(c) 2017, FCOO

	https://github.com/FCOO/bootstrap-popover-extensions
	https://github.com/FCOO

****************************************************************************/

(function ($/*, window, document, undefined*/) {
	"use strict";
	
    //Concert from all new placement to original
    var truePlacement2placement = {
            topleft   : 'top',    top   : 'top',    topright   : 'top',
            bottomleft: 'bottom', bottom: 'bottom', bottomright: 'bottom',
            lefttop   : 'left',   left  : 'left',   leftbottom : 'left',
            righttop  : 'right',  right : 'right',  rightbottom: 'right'
    };

    /****************************************************
    Overwrite Popover.show to save and modify new positions
    *****************************************************/
    $.fn.popover.Constructor.prototype.show = function( _show ){
        return function(){
            //If first time: Save 'true' placement
            if (!this.config.truePlacement){
                this.config.truePlacement = this.config.placement;
                this.config.placement = truePlacement2placement[this.config.truePlacement];
            }
            
            //Original methods
            _show.apply(this, arguments);

            //Adjust popover
            var $tip       = $(this.tip),
                arrowDim   = $tip.find('.arrow').width() || 10,
                arrowOffset = 6 + arrowDim,
                halfWidth  = $tip.width() / 2,
                halfHeight = $tip.height() / 2,
                offset     = 0;

            switch (this.config.truePlacement){
                case "topleft"    : 
                case "bottomleft" : offset = -halfWidth + arrowOffset; break;

                case "topright"   :
                case "bottomright": offset =  halfWidth - arrowOffset; break;

              
                case "lefttop"    :
                case "righttop"   : offset = -halfHeight + arrowOffset; break;

                case "leftbottom": 
                case "rightbottom": offset =  halfHeight - arrowOffset; break;
            }

            this._popper.modifiers[1].offset = offset;
        };

    }( $.fn.popover.Constructor.prototype.show );
    
   
}(jQuery, this, document));