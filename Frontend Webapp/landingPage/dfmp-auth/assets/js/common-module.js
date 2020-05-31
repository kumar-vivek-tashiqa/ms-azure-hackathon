		$(".main-container").hide();

		setTimeout(function(){ 
		   $(".page-loader").fadeOut("slow");
		   $(".main-container").show();
	    }, 400);


		function getParameterByName(name, url) {
		    if (!url) url = window.location.href;
		    name = name.replace(/[\[\]]/g, '\\$&');
		    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		        results = regex.exec(url);
		    if (!results) return null;
		    if (!results[2]) return '';
		    return decodeURIComponent(results[2].replace(/\+/g, ' '))
		}

		var language = getParameterByName('ui_locales') || '';

		var userLang = navigator.language || navigator.userLanguage;

		if( language == 'de'){
			$("#kc-current-locale-link").text('Deutsch');
		}else{
			$("#kc-current-locale-link").text('English');
		}


		function changeLang(lang){
			
			var selectedLang = $('#kc-current-locale-link').text();

			if(lang == 'de' && selectedLang !='Deutsch'){
				$(".page-loader").show();
				$("#kc-current-locale-link").text('Deutsch');
				var url = window.location.href;
		        var langUrl = url.replace("ui_locales=en", "ui_locales=de");
		        location.replace(langUrl);
			}
			else if(lang == 'en' && selectedLang !='English'){
				$(".page-loader").show();
				$("#kc-current-locale-link").text('English');
				var url = window.location.href;
		        var langUrl = url.replace("ui_locales=de", "ui_locales=en");
		        location.replace(langUrl);
			}

		}



