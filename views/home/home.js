const socket = io();

socket.on('connect', function() {
    console.log('Connected to server.');
});
socket.on('disconnect', function() {
    console.log('Disconnected from server.');
});

grecaptcha.ready(function() {
    grecaptcha.execute('6LeDcZAUAAAAAOUEBMCnn5Dhm0qw9sgPbd9eUueV', {action: 'homepage'});
});

$("#contactForm").submit(function(e) {
    e.preventDefault();
    
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var message = $("#message").val();
    var recap = $("#recap").val();
    
    if(!recap) {
        var response = grecaptcha.getResponse();
        if(response.length == 0) {
            $("#alert").html('<div class="alert alert-danger text-center alert-dismissible fade show" role="alert"><div id="space"></div><p>Recaptcha is required!</p></div>');
        return false;
        };
    };
    
    if(!name || !email || !phone || !message) {
        e.preventDefault();
        $("#alert").html('<div class="alert alert-danger text-center alert-dismissible fade show" role="alert"><div id="space"></div><p>You have to fill all the sections to be able to contact!</p></div>');
        return false;
    } else {
        e.preventDefault();
        $("#alert").html('<div class="alert alert-primary text-center alert-dismissible fade show" role="alert"><p>Thank you ' + name + ' for contacting!<br>I will get back to you as soon as possible :)</p>');
        return false;
    };
}); 

function verifyCaptcha() {
    document.getElementById('g-recaptcha-error').innerHTML = '';
};