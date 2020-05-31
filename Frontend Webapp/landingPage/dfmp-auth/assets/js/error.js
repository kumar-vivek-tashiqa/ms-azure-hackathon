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

		if( language == 'de'){
			$("#title").text('Seite Nicht Gefunden');
			$("#title-subheading").text('Die angeforderte Seite wurde auf dem Server nicht gefunden');
			$("#content").text('Versuchen Sie erneut sich anzumelden');
		}