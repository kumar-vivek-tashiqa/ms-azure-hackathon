    "use strict";

    // The current application coordinates were pre-registered in a B2C tenant.
    var appConfig = {
      b2cScopes: ['https://graph.microsoft.com/user.read','https://graph.microsoft.com/user.readbasic.all'],
      webApi: "https://dfmplatform.onmicrosoft.com/FinacoApp"
    };

    // configuration to initialize msal
    const msalConfig = {
        auth: {
            clientId: "34e99680-c387-49a4-8f76-9c07a70cc4b7", //This is your client ID
            authority: "https://dfmplatform.b2clogin.com/dfmplatform.onmicrosoft.com/b2c_1_dfmpSignup", //This is your tenant info
            validateAuthority: false
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: true
        }
    };

    // instantiate MSAL
    var myMSALObj = new Msal.UserAgentApplication(msalConfig);

    // request to signin - returns an idToken
    const loginRequest = {
        scopes: appConfig.b2cScopes,
        extraQueryParameters: { ui_locales: 'en', app_name: 'Finaco' }
    };

    // request to acquire a token for resource access
    const tokenRequest = {
        scopes: appConfig.b2cScopes
    };



	window.addEventListener("load", function () {
	    console.log("onLoad");
	    checkSignIn();
	});


	function checkSignIn(){

		console.log("Account :", myMSALObj.getAccount());

		if (myMSALObj.getAccount() == null) {

      logout();
			   
		}
		else{
			    
		}
	}

	function signIn() {
    //jQuery("#login-button").append('<img id="picture" src="./assets/images/rolling.gif" style="vertical-align:middle"/>');
	  myMSALObj.loginRedirect(loginRequest);
  }


    function signUp() {
       myMSALObj.authority = 'https://dfmplatform.b2clogin.com/dfmplatform.onmicrosoft.com/b2c_1_Signup';
	     myMSALObj.loginRedirect(loginRequest);
    }


	myMSALObj.handleRedirectCallback((error, response) => {
	    console.log('Callback Error :', error);
	    console.log('Callback Response :', response);

	    if( response != null && error ==''){

        logout();
	    	 
	    }
	    else{
	    	
	    }
    });


    //acquire a token silently
    function getToken(tokenRequest) {
        return myMSALObj.acquireTokenSilent(tokenRequest).catch(function(error) {
          console.log("aquire token popup");
          // fallback to interaction when silent call fails
          return myMSALObj.acquireTokenPopup(tokenRequest).then(function (tokenResponse) {
          }).catch(function(error){
		    console.log("Failed token acquisition", error);
            logMessage("Failed token acquisition", error);
        });
      });
    }

    // helper function to access the resource with the token
    function callApiWithAccessToken(accessToken) {
      // Call the Web API with the AccessToken
      $.ajax({
        type: "GET",
        url: appConfig.webApi,
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
      }).done(function (data) {
        logMessage("Web APi returned:\n" + JSON.stringify(data));
      })
        .fail(function (jqXHR, textStatus) {
          logMessage("Error calling the Web api:\n" + textStatus);
        })
    }


    // signout the user
    function logout() {
      // Removes all sessions, need to call AAD endpoint to do full logout
      myMSALObj.logout();
    }

