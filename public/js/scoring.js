var rr = window.rr || {};

(function($) {

    rr.scoring = {

        numWords: 0,

        wrapInSpan: function() {
            this.textWrapper = $( ".text" );

            var text = this.textWrapper.text();
            var words = text.split( " " );
            this.numWords = this.countWords( text );
            this.text = text;

            words = words.filter( Boolean );

            $( ".text" ).empty();

            $.each( words, function(name, value) {
                if( value !== '' ) {
                    $( ".text" ).append( $( "<span>" ).text( value ) ).append( " " );
                }
            } );

            //remove first empty thing for now.
            $( '.text' ).find( 'span:first' ).remove();

        },

        formatString: function(s) {
            s = s.replace( /(^\s*)|(\s*$)/gi, "" );//exclude  start and end white-space
            s = s.replace( /[ ]{2,}/gi, " " );//2 or more space to 1
            s = s.replace( /\n /, "\n" ); // exclude newline with a start spacing
            return s;
        },

        countWords: function(string) {
            var s = this.formatString( string );
            return s.split( ' ' ).length;
        },

        onRightArrow: function() {

            if( !this.activeSpan || this.activeSpan.length === 0 ) {
                this.activeSpan = $( '.text' ).find( 'span:first' );
            } else {
                this.activeSpan = this.activeSpan.next();
            }

            this.activeSpan.siblings().removeClass( 'active' );
            this.activeSpan.addClass( 'active' );
        },

        onLeftArrow: function() {
            if( !this.activeSpan || this.activeSpan.length === 0 ) {
                this.activeSpan = $( '.text' ).find( 'span:first' );
            } else {
                this.activeSpan = this.activeSpan.prev();
            }

            this.activeSpan.siblings().removeClass( 'active' );
            this.activeSpan.addClass( 'active' );
        },

        moveOnRight: function() {
            this.activeSpan = this.activeSpan.next('span');
            this.activeSpan.siblings().removeClass( 'active' );
            this.activeSpan.addClass( 'active' );

        },

        onEnter: function() {
            if( this.activeSpan ) {
                this.activeSpan.addClass( 'incorrect' );
                this.activeSpan.data( 'error', true );

                //bind any character expect enter or space save that as data
                $(document.body).on('keydown', jwerty.event('[a-z]', $.proxy(function() {

                }, this)));


                jwerty.key( '[a-z]', $.proxy( function(event) {

                    //unbind
                }, this ) );
            }
        },

        onError: function() {
            this.activeSpan.data('errorCode', String.fromCharCode(event.keyCode));
            this.moveOnRight();
            //unbind all of jwerty and then rebind
            $(document.body ).off('keydown');
        },

        init: function() {
            this.wrapInSpan();

            jwerty.key( 'arrow-right', $.proxy( this.onRightArrow, this ) );
            jwerty.key( 'arrow-left', $.proxy( this.onLeftArrow, this ) );
            jwerty.key( 'enter', $.proxy( this.onEnter, this ) );
        }

    };

    $( function() {
        rr.scoring.init();



    } );

})( jQuery );