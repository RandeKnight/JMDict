

function findFocus(){

 dojo.subscribe( 'partialrefresh-init', function(){
  // setTimeout needed to make it work in Firefox
  setTimeout(function(){
   var activeElementId = document.activeElement.id;
   //alert(activeElementId);
   var errorSubscription = dojo.subscribe( 'partialrefresh-error', function(){  
      dojo.unsubscribe( focusSubscription );
   });
   var focusSubscription = dojo.subscribe( 'partialrefresh-complete', function(){
    var activeElement = dojo.byId( activeElementId );
    if( (activeElement.nodeName == 'INPUT') &&      activeElement )
    {
     // Set focus to element/select text
     activeElement.focus();
     //activeElement.select();
    }
    if( (activeElement.nodeName == 'BUTTON') &&     activeElement  )
    {
     // Set focus to element/select text
     //activeElement.click();
    }
    // Unsubscribe after focus attempt is done
    dojo.unsubscribe( focusSubscription );
   });
  }, 0);
 } );
};  