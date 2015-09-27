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
    $('#new-animal').on('submit', function(e){
      e.preventDefault();
      // console.log($(this));
      Animal.create($(this).serialize());
    })
    $('#animal-list').on('click', '.status', function(e) {
      e.preventDefault();
      Animal.statusChange($(this).data('id'));
    })
  }
}

Animal = {
  all: function() {
    $.get('/animals', function(response){
      // console.log(response);
      var animals = response;
      $.each(animals, function(index, animal) {
        Animal.appendToPage(animal);
      })
    })
  },
  create: function(params) {
    // console.log(params);
    $.post('/animals', params)
    .done(function (response){
      // console.log(response);
      Animal.appendToPage(response);
    })
    .done(function(){
      $('#new-animal').trigger('reset');
    })
  },
  appendToPage: function(animal) {
    var listItem = '<li>';
    listItem += '<h3>'+ animal.name + '</h3>';
    listItem += '<ul>';
    listItem += '<li><strong>Species: </strong>' + animal.species + '</li>';
    listItem += '<li><strong>Breed: </strong>' + animal.breed + '</li>';
    listItem += '<li><strong>Gender: </strong>' + animal.gender + '</li>';
    listItem += '<li><strong>Date of Birth: </strong>' + $.datepicker.formatDate('MM dd, yy', new Date(animal.dob)); + '</li>';
    // A BUTTON NEEDS TO GO HERE FOR ADOPTION/ABANDON INNIT.
    listItem += '<li><strong>Status: </strong><a href="#" class="status" data-id="'+ animal._id +'">' + animal.status + '</a></li>'
    listItem += '</ul>';
    listItem += '</li>';

    $('#animal-list').prepend(listItem);
  },
  statusChange: function(id) {
    console.log(id);
    $.ajax({
      url: '/animals/' + id,
      type: 'put'
    })
    .done(function(response){
      console.log(response);
    })
  }
};