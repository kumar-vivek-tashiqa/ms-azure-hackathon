    /* Toastr Options */

        toastr.options = {
          "positionClass" : "toast-top-center",
          "closeButton" : true,
          "debug" : false,
          "newestOnTop" : false,
          "progressBar" : false,
          "preventDuplicates" : false,
          "onclick" : null,
          "showDuration" : "300",
          "hideDuration" : "1000",
          "timeOut" : "5000",
          "extendedTimeOut" : "1000",
          "showEasing" : "swing",
          "hideEasing" : "linear",
          "showMethod" : "fadeIn",
          "hideMethod" : "fadeOut"
         }      


    /* Check Authentication */

    var baseKey = sessionStorage.getItem("verifyKYCBaseKey");

    var authRequestURL = 'https://api-verifykyc.azurewebsites.net/api/authentication/verify';

        $.ajax({
            type: "POST",
            url: authRequestURL,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', baseKey);
            },
            data: {},
            success: function(result, textStatus, xhr) {

                if(xhr.status == 200)
                {                           
                    $("#preloader").hide();
                    $(".nk-app-root").show();

                } else {
                    toastr.error('Please try again', 'Invalid Username/Password');

                    sessionStorage.setItem("verifyKYCSignOutStatus", true);
                    window.location.replace("./signin.html");
                }

            },
            error: function(request, status, error) {
                sessionStorage.setItem("verifyKYCSignOutStatus", true);      
                setTimeout(function(){ window.location.replace("./signin.html");}, 1000);
            }
        });



		/* Singout */

		$(document).ready(function() {

			$(".signout").on('click', function(event){
			    event.stopPropagation();
			    event.stopImmediatePropagation();

			    toastr.error('Please try again', 'Invalid Username/Password');
			    
			    sessionStorage.setItem("verifyKYCBaseKey", '');
			    sessionStorage.setItem("verifyKYCSignOutStatus", true);
			    window.location.replace("./signin.html");
			});

		});


        /* Side bar */

        $('.nk-nav-toggle').on('click', function(){

            console.log('Clicked');

            if( $('.toggle-active').is(':visible') ) {

                $('.nk-nav-toggle').removeClass('toggle-active');
                $('.nk-body').removeClass('nav-shown');

                $('.nk-header-menu').removeClass('mobile-menu');
                $('.nk-header-menu').removeClass('nk-sidebar-active');
                $('.nk-sidebar-overlay').remove();
            }
            else {

                console.log('Clicked Else');

                 $('.nk-nav-toggle').addClass('toggle-active');
                 $('.nk-body').addClass('nav-shown');

                 $('.nk-header-menu').addClass('mobile-menu');
                 $('.nk-header-menu').addClass('nk-sidebar-active');
                 $('.nk-header-wrap').append('<div class="nk-sidebar-overlay" data-target="headerNav"></div>');
            }
        });