// Alright, let's start Namespacing our shit. 
var Animal = Animal || {};
var View = View || {};

$(document).ready(function() {
  console.log( "Wagwan?" );
  Animal.all();
  View.init();
});

View = {
  init: function() {
  //event listeners, event delegation, etc.     
  }
}

Animal = {
  all: function() {
    $.get('/animals', function(response){
      console.log(response);
    })
  }
}