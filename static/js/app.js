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
    website: {
      url: true,
    },
    phone: {
      digits: true,
      minlength: 9,
    },
    map: {
      url: true,
    }
  }
});

// tinyMCE
tinymce.init({
  selector:'#description',
});

