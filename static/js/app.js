$(document).foundation();

// Analytics

lohudmetrics({
  'pagename': 'Foundation node template',
  'author': 'Kai Teoh'
})

// Form validation

var form = $('#form');
form.validate({
  rules: {
    name: {
      required: true,
    },
    description:{
      required: true,
    },
    detour: {
      required: true,
    },
    website: {
      required: true,
      url: true,
    },
    phone: {
      required: true,
      digits: true,
      minlength: 9,
    },
    map: {
      required: true,
      url: true,
    },
    address: {
      required: true,
    },
    city: {
      required: true,
    },
    state: {
      required: true,
      stateUS: true,
    },
    zip: {
      required: true,
      zipcodeUS: true,
    },
    lat: {
      required: true,
    },
    long: {
      required: true,
    }
  }
});

// tinyMCE
tinymce.init({
  selector:'#description',
});

// Preview functionality
  // $("#preview").click(function(event) {
  //   event.preventDefault();
  // });

  $("#preview").click(function(event) {
      event.preventDefault();

      if (form.valid() == true) {
        var name = $('input#name').val();
        var map = $('input#map').val();
        var description = tinymce.activeEditor.getContent({format: 'raw'});
        var detour = $('textarea#detour').val();
        var address = $('input#address').val();
        var city = $('input#city').val();
        var state = $('input#state').val();
        var zip = $('input#zip').val();
        var phone = $('input#phone').val().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        var website = $('input#website').val();
        var photo = $('input#photo').val();
        var SSLprotected = website.replace("https://www.","");
        var sitename = SSLprotected.replace("http://www.","");

        $('#display_preview').html("<h2 class='presto-h2'>"+name+"</h2><p><a href='"+map+"' target='_blank'>(Open location in browser)</a>"+description+"<strong>How much of a detour:</strong> "+detour+"</p><p> <strong>Go:</strong> <a href='"+map+"' target='_blank'>"+address+", "+city+", "+state+" "+zip+"</a>, "+phone+",  <a href='"+website+"' target='_blank'>"+sitename+"</a></p><p>Presto photo ID: "+photo+"</p>");
        
        // $('#display_copy').text("<iframe src='"+link+"' width='"+width+"px' height='"+height+"px' frameborder='"+frameborder+"' scrolling='"+scrolling+"'><!--iframe--></iframe>");
      } else {
        // alert( "Valid: " + form.valid() );
      }
  });
