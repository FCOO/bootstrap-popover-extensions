/****************************************************************************
	bootstrap-popover-extensions.js, 

	(c) 2017, FCOO

	https://github.com/FCOO/bootstrap-popover-extensions
	https://github.com/FCOO

****************************************************************************/

(function ($, Tether/*, window, document, undefined*/) {
	"use strict";
	
    //Concert from all new placement to original
    var truePlacement2placement = {
            topleft   : 'top',    top   : 'top',    topright   : 'top',
            bottomleft: 'bottom', bottom: 'bottom', bottomright: 'bottom',
            lefttop   : 'left',   left  : 'left',   leftbottom : 'left',
            righttop  : 'right',  right : 'right',  rightbottom: 'right'
    };

    /****************************************************
    Modify Tether.position to check if the element has a 
    data('Tether.position')-function and use it
    *****************************************************/
    Tether.modules.push({
        position: function( options ) { 
            var $element = $(this.element),
                posFunction = $element.data('Tether.position');

            if (posFunction)
                return $.proxy( posFunction, this )( options );              
            else
                return { top: options.top, left: options.left };
        }
    });

    
    
    /****************************************************
    bs_popover_position
    Calculate and modifies positions for popover
    *****************************************************/
    function bs_popover_position( options ){
        // +/-deltaY, +/-deltaX = distance to move popover to align edge with target
        var deltaY = options.elementPos.height / 2,
            deltaX = options.elementPos.width / 2,
            result = { top: options.top, left: options.left },
            placement = $(this.element).data( 'popver.truePlacement' );

        switch (placement){
          case "topleft"    : result.left -= deltaX; break;
          case "topright"   : result.left += deltaX; break;
          case "bottomleft" : result.left -= deltaX; break;
          case "bottomright": result.left += deltaX; break;

          case "lefttop"    : result.top -= deltaY; break;
          case "leftbottom" : result.top += deltaY; break;
          case "righttop"   : result.top -= deltaY; break;
          case "rightbottom": result.top += deltaY; break;
        }
        return result;
    }

  
    /****************************************************
    Overwrite Popover.show to save and modify new positions
    *****************************************************/
    $.fn.popover.Constructor.prototype.show = function( _show ){
        return function(){

            //If first time: Save 'true' placement, add position-function to element and add new classes
            if (!this.config.truePlacement){
                this.config.truePlacement = this.config.placement;
                this.config.placement = truePlacement2placement[this.config.truePlacement];

                if (this.config.placement != this.config.truePlacement)
                    $(this.tip)
                        .data( 'popver.truePlacement', this.config.truePlacement )
                        .data( 'Tether.position', bs_popover_position )
                        .addClass('popover-' + this.config.truePlacement );
            }
            
            //Original methods
            _show.apply(this, arguments);

        };
    }( $.fn.popover.Constructor.prototype.show );
    
    
    //Initialize/ready 
	$(function() { 

	
	}); 
}(jQuery, window.Tether, this, document));