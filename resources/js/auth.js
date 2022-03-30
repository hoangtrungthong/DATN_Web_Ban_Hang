var helpers = require('./helpers');

$(document).ready(function() {
    $('#form-login').validate({
        rules: {
            'email': {
                required: true,
                email: true
            },
            'password': {
                required: true,
                minlength: 6,
            }
        },
        // messages: {
        //     'email': {
        //         required: helpers.trans,
        //         pattern: 'sai định dạng'
        //     }
        // },
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent(".form-group"));
        }
    });

    $('#btn-login'). click(function(e) {
        e.preventDefault();

        if(!$('#form-login').valid()) {
            return;
        }

        $(this).attr('disabled', true);
        loader();
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

    $('.show-pass').click(function () {
        input = $("#password");
        $(this).toggleClass("fa-eye-slash fa-eye");
        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    })

    $('.show-confirmpass').click(function () {
        input = $("#password_confirmation");
        $(this).toggleClass("fa-eye-slash fa-eye");
        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    })

    var users = JSON.parse($('#all_users').val());
    $.validator.addMethod("alreadyExists", function(e) {
        return users.indexOf(e) == -1;
    }, "Đã tồn tại");

    $('#form-register').validate({
        rules: {
            'name': {
                required: true,
            },
            'email': {
                required: true,
                email: true,
                alreadyExists: true
            },
            'phone': {
                required: true,
                alreadyExists: true
            },
            'address': {
                required: true,
                minlength: 10
            },
            'password': {
                required: true,
                minlength: 8,
            },
            'password_confirmation': {
                equalTo : "#password"
            }
        },
        messages: {
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.parent(".form-group"));
        }
    });

    $('#btn-register').click(function(e) {
        e.preventDefault();

        if(!$('#form-register').valid()) {
            return;
        }

        $(this).attr('disabled', true);
        loader();
        var data = $('#form-register').serializeArray();
        $.ajax({
            type: 'POST',
            url: '/register',
            data: data,
            success: function (response) {
                window.location = '/home'
            }
        }).fail(function (response) {
            console.log(response.responseJSON.message);
            return $('.invalid-feedback').html(response.responseJSON.message).css('display', 'block')
        })
    })
})

function loader() {
    $('.pageLoader').css('width', '100%');
    $('.pageLoader').append(`<div class="loader"></div>`);
    $('body').css({'opacity': '0.8', 'background-image': 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url("images/auth/auth-bg.jpg")'});
    setTimeout(function() {
        $(".loader").remove();
        $('.pageLoader').css('width', '0');
        $('body').css({'opacity': '1', 'background-image': 'url("images/auth/auth-bg.jpg")'});
        $('#btn-login').prop('disabled', false);
        $('#btn-register').prop('disabled', false);
    }, 3000);
}
