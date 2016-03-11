$(document).foundation();
lohudmetrics({
  'pagename': 'Foundation node template',
  'author': 'Kai Teoh'
})

var max_count = 125;

$(document).ready(function () {
    var wordCounts = {};
  
    $("#the-turnaround").on('keyup', function() {
      var words = this.value.match(/\S+/g).length;
      if (words > max_count) {
          // Split the string on first 200 words and rejoin on spaces
          var trimmed = $(this).val().split(/\s+/, max_count).join(" ");
          // Add a space at the end to keep new typing making new words
          $(this).val(trimmed + " ");
      }
      else {
          $('#display_count_turnaround').html(words);
          $('#count_left_turnaround').html(max_count-words);
      }
    });

    $("#the-star").on('keyup', function() {
      var words = this.value.match(/\S+/g).length;
      if (words > max_count) {
          // Split the string on first 200 words and rejoin on spaces
          var trimmed = $(this).val().split(/\s+/, max_count).join(" ");
          // Add a space at the end to keep new typing making new words
          $(this).val(trimmed + " ");
      }
      else {
          $('#display_count_star').html(words);
          $('#count_left_star').html(max_count-words);
      }
    });

    $("#the-climax").on('keyup', function() {
       var words = this.value.match(/\S+/g).length;
       if (words > max_count) {
           // Split the string on first 200 words and rejoin on spaces
           var trimmed = $(this).val().split(/\s+/, max_count).join(" ");
           // Add a space at the end to keep new typing making new words
           $(this).val(trimmed + " ");
       }
       else {
           $('#display_count_climax').html(words);
           $('#count_left_climax').html(max_count-words);
       }
    });
  
  
}).keyup();

$("input.sendamessage").click(function(event) {
    event.preventDefault();
    
    var turnaround = $('textarea#the-turnaround').val();
    var quote1 = $('textarea#quote1').val();
    var star = $('textarea#the-star').val();
    var climax = $('textarea#the-climax').val();
    var quote2 = $('textarea#quote2').val();
    
    $('#display_final').html("<p>"+turnaround+"</p><p>"+quote1+"</p><p>"+star+"</p><p>"+climax+"</p><p>"+quote2);
});