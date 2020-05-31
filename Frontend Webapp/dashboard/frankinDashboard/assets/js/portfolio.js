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


        //sessionStorage.setItem("frankinUserBaseKey", '');

        var baseKey = localStorage.getItem("msal.idtoken");


        /* Check Authentication */

        function checkAuthentication(){

		    var authKYCRequestURL = 'https://api-verifykyc.azurewebsites.net/api/kyc/profile/me';

		    var frankinProfile = 'https://api-frankinmutualfund.azurewebsites.net/api/profile/me';

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

												                		$('#KYCID').val(result._id);

												                		sessionStorage.setItem("KYCID", result._id);

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
												                		
												                		$('.userFullName').text(name);
												                		$('#userEmailId').text(result.emailId);

												                		$('.userAccountBalance').text(formatCurrency(frankinResult.availableBalance));
												                		$('.userLockedBalance').text(formatCurrency(frankinResult.lockedBalance));

												                		$('.totalProfit').text(formatCurrency(frankinResult.totalProfit) );
												                		$('.monthProfit').text(formatCurrency(frankinResult.currentMonthProfit) );
												                		$('.todayProfit').text(formatCurrency(frankinResult.todayProfit));

												                		var availFunds = Number(frankinResult.availableBalance) - Number(frankinResult.lockedBalance);
												                		$('#availFunds').text(formatCurrency(availFunds));

												                		$('#investedFunds').text(frankinResult.investedFunds);

												               

												                				
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
																		  "lockedBalance": 100,
																		  "totalProfit": 100,
																		  "currentMonthProfit": 10,
																		  "todayProfit": 10,
																		  "investedFunds": 1
																		}

																	

												                    	var createProfileURL = 'https://api-frankinmutualfund.azurewebsites.net/api/profile';


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

													                                checkAuthentication();
													                                                             
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





		/* Validate Form */

		function formValidate(formId) {

		    $(formId).validate({
		        rules: {
		            firstname: "required",
		            "bs-amount": {
		                required: true,
		                digits: true
		            },
		        },
		        messages: {
		            firstname: "Please enter your firstname",
		            lastname: "Please enter your lastname",
		            mob_no: {
		                required: "Please enter a username",
		                minlength: "Your mobile number must consist of at least 8 digits"
		            },
		            email: {
		                required: "Please enter email address",
		                "verify-email": "Please enter a valid email address"
		            }
		        }
		    });
		}




		        $.validator.setDefaults({
		            submitHandler: function() {
		                var $inputs = $('#add-credit-form :input');
		                if ($inputs) {
		                    var values = {};
		                    $inputs.each(function() {
		                        values[this.name] = $(this).val();
		                    });

		                    console.log('Inside Form');
		                    var t = $("#add-credits-container");

		                    t.addClass("block-ui-spinner");

						    	var amountToBeCredited = $('#credit-amount').val();

				                var KYCID = sessionStorage.getItem("KYCID");
				                var userAccountBalance = sessionStorage.getItem("userAccountBalance");
				                var userLockedBalance = sessionStorage.getItem("userLockedBalance");
				                var totalProfit = sessionStorage.getItem("totalProfit");

				                var currentMonthProfit = sessionStorage.getItem("currentMonthProfit");
				                var todayProfit = sessionStorage.getItem("todayProfit");
				                var investedFunds = sessionStorage.getItem("investedFunds");

						    	var amountUpdated = Number(userAccountBalance) + Number(amountToBeCredited);

						    	console.log('Total Balance :', userAccountBalance);
						    	console.log('Amount Locked :', userLockedBalance);
						    	console.log('Amount totalProfit :', totalProfit);
						    	console.log('Amount currentMonthProfit :', currentMonthProfit);
						    	console.log('Amount todayProfit :', todayProfit);
						    	console.log('Amount investedFunds :', investedFunds);
						    	


												                    	var data = {
																		  "kycID": KYCID,
																		  "totalBalance": Number(amountUpdated),
																		  "availableBalance": Number(amountUpdated),
																		  "lockedBalance": Number(userLockedBalance),
																		  "totalProfit": Number(totalProfit),
																		  "currentMonthProfit": Number(currentMonthProfit),
																		  "todayProfit": Number(todayProfit),
																		  "investedFunds": Number(investedFunds)
																		}	

												                    	var updateProfileURL = 'https://api-frankinmutualfund.azurewebsites.net/api/profile';


													                    $.ajax({
													                        type: "PATCH",
													                        url: updateProfileURL,
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

													                            	toastr.success('Use our exciting services', 'Amount credited to Wallet');

													                            	console.log('Amount added :', result);

													                            	t.removeClass("block-ui-spinner");

													                                $('#deposit-credits').modal('hide');
													                                                             
													                            } else {
													                                
													                                toastr.error('Please try again', 'Credits not added');
													                            }

													                          

													                        },
													                        error: function(request, status, error) {
													                            console.log('Request Demo Error :', error);
													                            console.log('Request Demo Error Status :', status);
													                            console.log('Request Demo Error Request :', request);

													                            toastr.error('Please try again', 'Credits not added');
													                            t.removeClass("block-ui-spinner");


													                        }
													                    });





						    
		                    
		                    
		                    }

		                }
		            });


		formValidate("#add-credit-form");


		