		$("#attributeList li:eq(0)").before($("#attributeList li:eq(3)"));
		$("#attributeList li:eq(1)").before($("#attributeList li:eq(4)"));


		$(document).ready(function(){
		var url = window.location.href;
		var signInUrl = url.replace("B2C_1_Signup", "B2C_1_dfmpSignup");
		   document.getElementById("signIn").href=signInUrl;
		   document.getElementById('email').type = 'text';
		});


		$("#attributeVerification").submit(function(){
		   $(".page-loader").show();
		   setTimeout(function(){ 
		      $(".page-loader").fadeOut("slow");
	       }, 300);
		});

		var language = getParameterByName('ui_locales') || '';

		if( language == 'de'){
			$("#signup-heading").text('Verify KYC-Konto Erstellen');
			$("#signIn").text('Stattdessen Anmelden');
			$("#caption").text('Alle Tashiqa-Produkte nutzen - mit nur einem Konto');

			$("#help").text('Hilfe');
			$("#privacy").text('Datenschutz');
            $("#terms").text('Bedingungen');
		}

		$("#email_ver_but_send").click(function(){
		  $("#button-loader").remove();
		  $("#email_ver_wait").append("<img id='button-loader' src='https://tashiqa.web.app/azure-auth/assets/img/rolling.gif' width=40 alt='Loading...' />");
		});