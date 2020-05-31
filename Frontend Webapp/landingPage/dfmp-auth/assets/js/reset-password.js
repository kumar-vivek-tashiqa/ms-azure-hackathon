		$("#attributeVerification").submit(function(){
		   $(".page-loader").show();
		   $("#email_success,#verifying_blurb").hide();
		   setTimeout(function(){ 
		      $(".page-loader").fadeOut("slow");
	       }, 300);
		});

		if( language == 'de'){
			$("#title-heading").text('Setze dein Passwort Zuruck');
			$("#title-subheading").text('Geben Sie Ihre Erholung ein Email ID');

			$("#help").text('Hilfe');
			$("#privacy").text('Datenschutz');
            $("#terms").text('Bedingungen');
		}

		$("#email_ver_but_send").click(function(){
		  $("#button-loader").remove();
		  $("#email_ver_wait").append("<img id='button-loader' src='https://tashiqa.web.app/azure-auth/assets/img/rolling.gif' width=40 alt='Loading...' />");
		});