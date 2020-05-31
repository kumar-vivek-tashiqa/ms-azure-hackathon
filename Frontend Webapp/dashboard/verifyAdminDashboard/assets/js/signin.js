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

        function checkAuthentication(){

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
		                    	toastr.success('Redirecting to Dashboard', 'Authenticated Successfully');
		                    	sessionStorage.setItem("verifyKYCSignOutStatus", false);
		                    	window.location.replace("./index.html");
		                    } else {
		                    	sessionStorage.setItem("verifyKYCBaseKey", '');
		                    	$("#page-loader").hide();
		                    	$(".main-container").show();
		                    }

		            },
		            error: function(request, status, error) {
		                    console.log('Request Demo Error :', error);
		                    console.log('Request Demo Error Status :', status);
		                    console.log('Request Demo Error Request :', request.status);
		                    sessionStorage.setItem("verifyKYCBaseKey", '');
		                    sessionStorage.setItem("verifyKYCSignOutStatus", true);
		                    $("#page-loader").hide();
		                    $(".main-container").show();
		            }
		        });
        }

        var verifyKYCSignOutStatus = sessionStorage.getItem("verifyKYCSignOutStatus");

        if(verifyKYCSignOutStatus != 'true'){
           $("#page-loader").show();
           checkAuthentication();
        }
        else{
			$("#page-loader").hide();
		    $(".main-container").show();
        }

		/* Validate Form */
        $(function() {

		    $("#localAccountForm").validate({
		        rules: {
		            password: {
		                required: true,
		                minlength: 7
		            },
		            username: {
		                required: true,
		                minlength: 4
		            },
		        },
		        messages: {
		            password: {
		                required: "Please enter your password",
		                minlength: "Your password must consist of at least 7 characters"
		            },
		            username: {
		                required: "Please enter your username",
		                minlength: "Your username must consist of at least 4 characters"
		            },
		            email: "Please enter a valid email address"
		        }
		    });
	   
		});


	    $.validator.setDefaults({
		    submitHandler: function() {
		        var $inputs = $('#localAccountForm :input');
		        if ($inputs) {
		            var values = {};
		            $inputs.each(function() {
		                values[this.name] = $(this).val();
		            });

		            $(".page-loader").show();
		            
		            var data = {
		                username: values.username,
		                password: values.password
		            };

		            var requestURL = 'https://api-verifykyc.azurewebsites.net/api/authentication';

		            $.ajax({
		                type: "POST",
		                url: requestURL,
		                data: data,
		                success: function(result) {

		                	console.log('Response : ', result);

		                	$(".page-loader").fadeOut("slow");

		                    if (result.message == "Authentication successful") {
		                    	sessionStorage.setItem("verifyKYCBaseKey", result.base64Key);
		                    	sessionStorage.setItem("verifyKYCSignOutStatus", false); 	                    	
		                    	toastr.success('Redirecting to Dashboard', 'Authenticated Successfully');		                    	
                          	    setTimeout(function(){ window.location.replace("./index.html"); }, 1500);
		                    } else {
		                    	sessionStorage.setItem("verifyKYCBaseKey", ''); 
		                        toastr.error('Please try again', 'Invalid Username/Password');
		                    }

		                    $('#localAccountForm').trigger("reset");

		                },
		                error: function(request, status, error) {
		                    console.log('Request Demo Error :', error);
		                    console.log('Request Demo Error Status :', status);
		                    console.log('Request Demo Error Request :', request.status);
		                    sessionStorage.setItem("verifyKYCBaseKey", '');
		                    sessionStorage.setItem("verifyKYCSignOutStatus", true);
		                    $('#localAccountForm').trigger("reset");
		                    $(".page-loader").fadeOut("slow");
		                    toastr.error('Please try again', 'Invalid Username/Password');
		                }
		            });

		            
		        }

		    }
		});



	    /* Change Language */
	    
		function changeLang(lang){

			var selectedLang = $('#kc-current-locale-link').text();

			if(lang == 'de' && selectedLang !='Deutsch'){
				$("#kc-current-locale-link").text('Deutsch');

				$("#signin-heading").text('Anmeldung');
				$("#signin-aub-heading").text('Weiter zu Verify KYC');
				$("#email").attr("placeholder", "Nutzername");
				$("#password").attr("placeholder", "Kennwort");
				$("#kc-login").text('Anmelden');

				$("#help").text('Hilfe');
				$("#privacy").text('Datenschutz');
	            $("#terms").text('Bedingungen');
			}
			else if(lang == 'en' && selectedLang !='English'){
				$("#kc-current-locale-link").text('English');

				$("#signin-heading").text('Sign In');
				$("#signin-aub-heading").text('Sign in to Verify KYC');
				$("#email").attr("placeholder", "Username");
				$("#password").attr("placeholder", "Password");
				$("#kc-login").text('SIGN IN');

				$("#help").text('Help');
				$("#privacy").text('Privacy');
	            $("#terms").text('Terms');
			}

		}