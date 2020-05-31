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


        //sessionStorage.setItem("finacoUserBaseKey", '');

        var baseKey = localStorage.getItem("msal.idtoken");

        /* Check Authentication */

        function checkAuthentication(){

		    var authKYCRequestURL = 'https://api-verifykyc.azurewebsites.net/api/kyc/profile/me';

		    var finacoProfile = 'https://api-finacomutualfund.azurewebsites.net/api/profile/me';

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
												            url: finacoProfile,
										                    beforeSend: function (xhr) {
										                        xhr.setRequestHeader('Authorization', 'Bearer ' + baseKey);
										                    },
												            data: {},
												            success: function(finacoResult, textStatus, xhr) {

												                	if(xhr.status == 200)
												                	{	                    	
						
												                		console.log('Bank Profile :', finacoResult);

												                		var name = result.firstName+' '+result.lastName;


												                		console.log('KYC Data :', result);



                                                                        sessionStorage.setItem("userFullName", name);
                                                                        sessionStorage.setItem("userEmailId", result.emailId);
                                                                        sessionStorage.setItem("userAccountBalance", finacoResult.availableBalance);
                                                                        sessionStorage.setItem("userLockedBalance", finacoResult.lockedBalance);
                                                                        sessionStorage.setItem("totalProfit", finacoResult.totalProfit);

                                                                        sessionStorage.setItem("totalProfit", finacoResult.totalProfit);
                                                                        sessionStorage.setItem("currentMonthProfit", finacoResult.currentMonthProfit);
                                                                        sessionStorage.setItem("todayProfit", finacoResult.todayProfit);
                                                                        sessionStorage.setItem("investedFunds", finacoResult.investedFunds);


												                		$('.userInitial').text(getNameIntial(name));
												                		$('#userKYCStatus').text(result.status);
												                		$('.userFullName').text(name);
												                		$('.userEmailId').text(result.emailId);

												                		$('#phoneNumber').text(result.phoneNumber);
												                		$('#dob').text(getDate(result.dateOfBirth));

												                		var address = result.address.addressLine1+' '+result.address.addressLine2;

												                		$('#address').text(address);

												                		$('.userAccountBalance').text(finacoResult.availableBalance);
												                		$('.userLockedBalance').text(finacoResult.lockedBalance);

												                				
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


	