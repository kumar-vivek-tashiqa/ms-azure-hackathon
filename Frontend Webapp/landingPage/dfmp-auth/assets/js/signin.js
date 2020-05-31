
		$(document).ready(function(){
		var url = window.location.href;
		var singupUrl = url.replace("B2C_1_dfmpSignup", "B2C_1_Signup");
		var resetPageUrl = url.replace("B2C_1_dfmpSignup", "B2C_1_resetPassword");
		
			document.getElementById("forgotPassword").href=resetPageUrl;
			document.getElementById("createAccount").href=singupUrl;

			$("#logonIdentifier").prop('required',true);
			$("#password").prop('required',true);

			

		});

		function getParameterByName(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, '\\$&');
		    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, ' '))
		}

		var appName = getParameterByName('app_name') || '';

		$("#app-name").text(appName);


		/* Validate Form */

		function formValidate(formId) {

		    $(formId).validate({
		        rules: {
		            firstname: "required",
		            lastname: "required",
		            Password: "required",
		            "Username or email address": {
		                required: true,
		                email: true
		            }
		        },
		        messages: {
		            firstname: "Please enter your firstname",
		            lastname: "Please enter your lastname",
		            username: {
		                required: "Please enter a username",
		                minlength: "Your username must consist of at least 2 characters"
		            },
		            email: "Please enter a valid email address"
		        }
		    });
	    }

		setTimeout(function(){ formValidate("#localAccountForm"); }, 2000);

		 
		var form = $("#localAccountForm");

		    $("#next").click(function() {
		        if(form.valid() == true ) { 
		            $(".page-loader").show();
		           	setTimeout(function(){ 
					   $(".page-loader").hide();
				    }, 700);
		        }
		    });

		    $("#password").keyup(function(event) {
		        if(form.valid() == true && event.keyCode === 13) { 
		            $(".page-loader").show();
		           	setTimeout(function(){ 
					   $(".page-loader").hide();
				    }, 700);
		        }
			});

		var language = getParameterByName('ui_locales') || '';

		if( language == 'de'){
			$("#title-heading").text('Anmeldung');
			$("#title-subheading").text('Weiter zu');

			$("#help").text('Hilfe');
			$("#privacy").text('Datenschutz');
            $("#terms").text('Bedingungen');
		}

