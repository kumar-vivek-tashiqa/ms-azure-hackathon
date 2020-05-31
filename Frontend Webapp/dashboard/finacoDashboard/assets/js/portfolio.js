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


    /* Format Currency */


    function formatCurrency(d){

    	return (d).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }


        //sessionStorage.setItem("finacoUserBaseKey", '');

        var baseKey = sessionStorage.getItem("finacoUserBaseKey");


        /* Check Authentication */

        function checkAuthentication(){

		    var authKYCRequestURL = 'https://api-verifykyc.azurewebsites.net/api/kyc/profile/me';

		    var finacoProfile = 'https://api-finacomutualfund.azurewebsites.net/api/profile/me';

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

												                		$('.userInitial').text(getNameIntial(name));
												                		
												                		$('.userFullName').text(name);
												                		$('#userEmailId').text(result.emailId);

												                		$('.userAccountBalance').text(formatCurrency(finacoResult.availableBalance));
												                		$('.userLockedBalance').text(formatCurrency(finacoResult.lockedBalance));

												                		$('.totalProfit').text(formatCurrency(finacoResult.totalProfit) );
												                		$('.monthProfit').text(formatCurrency(finacoResult.currentMonthProfit) );
												                		$('.todayProfit').text(formatCurrency(finacoResult.todayProfit));

												                		var availFunds = Number(finacoResult.availableBalance) - Number(finacoResult.lockedBalance);
												                		$('#availFunds').text(formatCurrency(availFunds));

												                		$('#investedFunds').text(finacoResult.investedFunds);

												                		$('.todayProfit').text(formatCurrency(finacoResult.todayProfit));

												                				
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


												                    	console.log('New user, add balance and create profile', result._id);


												                    	var data = {
																		  "kycID": result._id,
																		  "totalBalance": 30000,
																		  "availableBalance": 30000,
																		  "lockedBalance": 0,
																		  "totalProfit": 0,
																		  "currentMonthProfit": 0,
																		  "todayProfit": 0,
																		  "investedFunds": 0
																		}

																	

												                    	var createProfileURL = 'https://api-finacomutualfund.azurewebsites.net/api/profile';


													                    $.ajax({
													                        type: "POST",
													                        url: createProfileURL,
													                        processData: false,
													                        'dataType': 'json',
													                        contentType: 'application/json',
													                        beforeSend: function (xhr) {
													                             xhr.setRequestHeader('Authorization', 'Bearer ' + baseKey);
													                        },
													                        data: JSON.stringify(data),
													                         success: function(result, textStatus, xhr) {

													                           
													                            if(xhr.status == 200)
													                            {

													                            	$("#preloader").hide();
										                    			            $(".nk-app-root").show();

													                            	console.log('Created Profile :', result);

													                                $('#initial-profile').modal('show');
													                                                             
													                            } else {
													                                
													                                toastr.error('Please try again', 'KYC Request Failed');
													                            }

													                          

													                        },
													                        error: function(request, status, error) {
													                            console.log('Request Demo Error :', error);
													                            console.log('Request Demo Error Status :', status);
													                            console.log('Request Demo Error Request :', request);
													                        }
													                    });


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


		/* Singout */

		$(document).ready(function() {

			$(".signout").on('click', function(event){
			    event.stopPropagation();
			    event.stopImmediatePropagation();

			    toastr.error('Please try again', 'Invalid Username/Password');
			    
			    sessionStorage.setItem("govtBaseKey", '');
			    sessionStorage.setItem("govtSignOutStatus", true);
			    window.location.replace("./signin.html");
			});

		});