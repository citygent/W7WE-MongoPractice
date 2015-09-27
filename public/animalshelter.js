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
      var animals = response;
      $.each(animals, function(index, animal) {
        var listItem = '<li>';
        listItem += '<h3>'+ animal.name + '</h3>';
        listItem += '<ul>';
        listItem += '<li>' + animal.species + '</li>';
        listItem += '<li>' + animal.breed + '</li>';
        listItem += '<li>' + animal.gender + '</li>';
        listItem += '<li>' + animal.dob + '</li>';
        listItem += '</ul>';
        listItem += '</li>';

        $('#animal-list').append(listItem);
      })
    })
  }
}