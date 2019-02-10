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

$("#contactForm").submit(function(e) {
    if(!recap) {
        e.preventDefault();
        var response = grecaptcha.getResponse();
        if(response.length == 0) {
            $("#alert").html('<div class="alert alert-danger text-center alert-dismissible fade show" role="alert"><div id="space"></div><p>Recaptcha is required!</p></div>');
        return false;
        };
    };
}); 

//function verifyCaptcha() {
//    document.getElementById('g-recaptcha-error').innerHTML = '';
//};