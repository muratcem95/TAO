const socket = io();

socket.on('connect', function() {
    console.log('Connected to server.');
});
socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

var onloadCallback = function() {
    grecaptcha.render('html_element', {
      'sitekey' : '6LchdJAUAAAAALvHEbglXqtwrj_qsLkwimKtjQXK'
    });
};

function verifyCaptcha() {
    document.getElementById('g-recaptcha-error').innerHTML = '';
};

$("#contactForm").submit(function(e) {
    e.preventDefault();
    
    if(!recap) {
        var response = grecaptcha.getResponse();
        if(response.length == 0) {
            $("#alert").html('<div class="alert alert-danger text-center alert-dismissible fade show" role="alert">Recaptcha is required!</div>');
        };
    } else {
        $(this).unbind('submit').submit()
    };
}); 