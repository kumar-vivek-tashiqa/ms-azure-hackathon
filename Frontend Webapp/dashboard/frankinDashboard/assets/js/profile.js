/* Toastr Alert */

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


    /* Get Name Intial */

    function getNameIntial(n){
        var sub = n.match(/\b\w/g) || [];
        sub = ((sub.shift() || '') + (sub.pop() || '')).toUpperCase();
        return sub;
    }


    /* Get Date Time */



function getDate(dt){

   var date = new Date(dt);
   date = date.toString();
   var time = date.substring(11, 21);
   date = date.substring(4, 15);
  
   return date;
}

    /* Format Currency */


    function formatCurrency(d){

    	return (d).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }


        //sessionStorage.setItem("frankinUserBaseKey", '');

        var baseKey = localStorage.getItem("msal.idtoken");

        /* Check Authentication */

        function checkAuthentication(){

		    var authKYCRequestURL = 'https://api-verifykyc.azurewebsites.net/api/kyc/profile/me';

		    var frankinProfile = 'https://api-frankinmutualfund.azurewebsites.net/api/profile/me';

			sessionStorage.setItem("triggerBuyMutualFundId", '');
	        sessionStorage.setItem("triggerBuyMutualFundSchemeId", '');
	        sessionStorage.setItem("triggerBuyMutualFundSchemeName", '');

		        $.ajax({
		            type: "GET",
		            url: authKYCRequestURL,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + baseKey);
                    },
		            data: {},
		            success: function(result, textStatus, xhr) {

		                	if(xhr.status == 200)
		                	{	                    	
		                			if(result.status == 'verified'){

		                						        $.ajax({
												            type: "GET",
												            url: frankinProfile,
										                    beforeSend: function (xhr) {
										                        xhr.setRequestHeader('Authorization', 'Bearer ' + baseKey);
										                    },
												            data: {},
												            success: function(frankinResult, textStatus, xhr) {

												                	if(xhr.status == 200)
												                	{	                    	
						
												                		console.log('Bank Profile :', frankinResult);

												                		var name = result.firstName+' '+result.lastName;


												                		console.log('KYC Data :', result);



                                                                        sessionStorage.setItem("userFullName", name);
                                                                        sessionStorage.setItem("userEmailId", result.emailId);
                                                                        sessionStorage.setItem("userAccountBalance", frankinResult.availableBalance);
                                                                        sessionStorage.setItem("userLockedBalance", frankinResult.lockedBalance);
                                                                        sessionStorage.setItem("totalProfit", frankinResult.totalProfit);

                                                                        sessionStorage.setItem("totalProfit", frankinResult.totalProfit);
                                                                        sessionStorage.setItem("currentMonthProfit", frankinResult.currentMonthProfit);
                                                                        sessionStorage.setItem("todayProfit", frankinResult.todayProfit);
                                                                        sessionStorage.setItem("investedFunds", frankinResult.investedFunds);


												                		$('.userInitial').text(getNameIntial(name));
												                		$('#userKYCStatus').text(result.status);
												                		$('.userFullName').text(name);
												                		$('.userEmailId').text(result.emailId);

												                		$('#phoneNumber').text(result.phoneNumber);
												                		$('#dob').text(getDate(result.dateOfBirth));

												                		var address = result.address.addressLine1+' '+result.address.addressLine2;

												                		$('#address').text(address);

												                		$('.userAccountBalance').text(frankinResult.availableBalance);
												                		$('.userLockedBalance').text(frankinResult.lockedBalance);

												                				
																		$("#preloader").hide();
										                    			$(".nk-app-root").show();
												                		
												                    } else {
												                    	 window.location.replace("./welcome.html");
												                    }

												            },
												            error: function(request, status, error) {
												                    console.log('Request Demo Error :', error);
												                    console.log('Request Demo Error Status :', status);
												                    console.log('Request Demo Error Request :', request.status);
												                	
												                    if(request.status == '400'){


												                    	console.log('New user, add balance and create profile');




												                    }

												            }
												        });


		                		    }
		                		    else{
                    					window.location.replace("./welcome.html");
		                		    }



		                		
		                    } else {
		                    	 window.location.replace("./welcome.html");
		                    }

		            },
		            error: function(request, status, error) {
		                    console.log('Request Demo Error :', error);
		                    console.log('Request Demo Error Status :', status);
		                    console.log('Request Demo Error Request :', request.status);
		                	window.location.replace("./welcome.html");
		            }
		        });
        }

        checkAuthentication();


	