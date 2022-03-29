$(document).ready(function() {
    $('#btn-login'). click(function(e) {
        e.preventDefault();
        $(this).attr('disabled', true);
        var data = $('#form-login').serializeArray();
        $.ajax({
            type: 'POST',
            url: '/login',
            data: data,
        }).done(function (response) {
            window.location = '/home'
        }).fail(function (response){
            $('.invalid-feedback').html(response.responseJSON.message).css('display', 'block')
        })
    })
})
