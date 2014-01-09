function hijackAndPublishPartialRefresh(){
 // Hijack the partial refresh
 XSP._inheritedPartialRefresh = XSP._partialRefresh;
 XSP._partialRefresh = function( method, form, refreshId, options ){  
     // Publish init
     dojo.publish( 'partialrefresh-init', [ method, form, refreshId, options ]);
     this._inheritedPartialRefresh( method, form, refreshId, options );
 }
 
 // Publish start, complete and error states 
 dojo.subscribe( 'partialrefresh-init', function( method, form, refreshId, options ){
  
  if( options ){ // Store original event handlers
   var eventOnStart = options.onStart; 
   var eventOnComplete = options.onComplete;
   var eventOnError = options.onError;
  }

  options = options || {};  
  options.onStart = function(){
   dojo.publish( 'partialrefresh-start', [ method, form, refreshId, options ]);
   if( eventOnStart ){
    if( typeof eventOnStart === 'string' ){
     eval( eventOnStart );
    } else {
     eventOnStart();
    }
   }
  };
  
  options.onComplete = function(){
   dojo.publish( 'partialrefresh-complete', [ method, form, refreshId, options ]);
   if( eventOnComplete ){
    if( typeof eventOnComplete === 'string' ){
     eval( eventOnComplete );
    } else {
     eventOnComplete();
    }
   }
  };
  
  options.onError = function(){
   dojo.publish( 'partialrefresh-error', [ method, form, refreshId, options ]);
   if( eventOnError ){
    if( typeof eventOnError === 'string' ){
     eval( eventOnError );
    } else {
     eventOnError();
    }
   }
  };
 });
};
dojo.addOnLoad(function(){
 dojo.subscribe( 'partialrefresh-init', function(){
  // setTimeout needed to make it work in Firefox
  setTimeout(function(){ 
   var activeElementId = document.activeElement.id;   

   var focusSubscription = dojo.subscribe( 'partialrefresh-complete', function(){
    var activeElement = dojo.byId( activeElementId );

    if( activeElement && 'INPUT|SELECT|TEXTAREA'.indexOf( activeElement.nodeName ) > -1  ){ 
     // Set focus to element/select text
     activeElement.focus();
     if( activeElement.nodeName !== 'SELECT' ){ activeElement.select(); }
    }
    
    // Unsubscribe after focus attempt is done
    dojo.unsubscribe( focusSubscription ); 
   });

   // In case of error -> remove subscription
   var errorSubscription = dojo.subscribe( 'partialrefresh-error', function(){
      dojo.unsubscribe( focusSubscription );
   });
  }, 0 );
 } );
});
