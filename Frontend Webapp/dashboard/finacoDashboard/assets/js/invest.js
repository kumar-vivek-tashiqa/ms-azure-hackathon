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

												                		$('.userInitial').text(getNameIntial(name));
												                		$('#userKYCStatus').text(result.status);
												                		$('.userFullName').text(name);
												                		$('#userEmailId').text(result.emailId);

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

        //checkAuthentication();


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





/* Get Mutual Funds */

function getMutualFunds() {

	var mutualFundListURL = 'https://api-finacomutualfund.azurewebsites.net/api/mutualFund';

	$("#mutual_fund_data").mDatatable("destroy");

	var DatatableRemoteAjaxDemo = {
            init: function() {
                ! function() {
                    var t = $("#mutual_fund_data").mDatatable({
                        data: {
                            type: "remote",
                            source: {
                                read: {
                                    method: "GET",
                                    url: mutualFundListURL,
                                    headers: {
                                      'Authorization': 'Bearer ' + baseKey
                                    },
                                    params: {
                                       data: {}
                                    },
                                    map: function(t) {
                                        var e = t;
                             
                                        return void 0 !== t.data && (e = t.data), e
                                    }
                                }
                            },
		                    pageSize: 10,
                        },
                        layout: {
                            scroll: !1,
                            footer: !1
                        },
                        sortable: !0,
                        pagination: !0,
						search: {
							input: $("#userMutualFundSearch"),
							delay: 400
				        },
				        rows: {
				            callback: function(t, a, e) {}
				        },
                        toolbar: {
                            items: {
                                pagination: {
                                    pageSizeSelect: [2, 4, 5, 10]
                                }
                            }
                        },
                        translate: {
                                        records: {
                                            processing: 'Please wait...',
                                            noRecords: 'No Records Found'
                                        }
                                    },
                        columns: [{
                                    width: 70,
                                    field: "_id",
                                    title: "Fund Logo",
                                    template: function(t) {
                                        var output;

                                            var n = t.schemeName;
                                            var sub = n.match(/\b\w/g) || [];
                                            sub = ((sub.shift() || '') + (sub.pop() || '')).toUpperCase();

                                            var s = ["success", "brand", "danger", "accent", "warning", "metal", "primary", "info"][Math.floor(Math.random() * 8)];
                                            output = '<center><div class="m-card-user m-card-user--sm">\t\t\t\t\t\t\t\t<div class="m-card-user__pic">\t\t\t\t\t\t\t\t\t<div style="width: 40px; -webkit-border-radius: 100%; -webkit-justify-content: center; display: flex; -webkit-align-items: center; font-size: 0.96rem; font-weight: 400;color: white; height: 40px;"class="m-card-user__no-photo m--bg-fill-' + s + '"><span>' + sub + '</span></div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div></center>'
                                        
                                        return output
                                    }
                                },
                        {
                            field: "schemeName",
                            title: "Scheme Name",
                            width: 180
                        }, {
                            field: "fundDescription",
                            title: "Fund Description",
                            width: 200
                        }, {
                            field: "fundCategory",
                            title: "Fund Type",
                            width: 70
                        }, 

                         {
                            field: "termMonth",
                            title: "Term Month",
                            width: 80
                        }, 
                        {
                            width: 110,
                            field: "minimumAmount",
                            title: "Minimum Amount",
                            template: function(t) {
                                var a = 'Rs.' + t.minimumAmount;
                                return a
                            }
                        },
                        {
                            width: 80,
                            field: "category",
                            title: "Category",
                            template: function(t) {
                                var status = t.category.toLowerCase();

                                var a = {
                                    "large cap": {
                                        title: "Large Cap",
                                        class: " m-badge--info"
                                    },
                                    "mid cap": {
                                        title: "Mid Cap",
                                        class: " m-badge--warning"
                                    }
                                };
                                return '<span class="m-badge ' + a[status].class + ' m-badge--wide">' + a[status].title + "</span>"
                            }
                        },
                        {
                            field: "oneYrReturns",
                            title: "1 Yr Returns (%)",
                            width: 100
                        }, 
                        {
                            field: "threeYrReturns",
                            title: "3 Yr Returns (%)",
                            width: 100
                        }, 
                        {
                            field: "fiveYrReturns",
                            title: "5 Yr Returns (%)",
                            width: 100
                        }, 

						 {
                            field: "risk",
                            title: "Risk",
                            width: 90,
                            template: function(t) {
                                var status = t.risk.toLowerCase();
                                var a = {
                                    "low": {
                                        title: "Low",
                                        class: " m-badge--success"
                                    },
                                    "high": {
                                        title: "High",
                                        class: " m-badge--danger"
                                    },
                                    "moderate": {
                                        title: "Moderate",
                                        class: " m-badge--warning"
                                    }
                                };
                                return '<span class="m-badge ' + a[status].class + ' m-badge--wide">' + a[status].title + "</span>"
                            }
                        },
						{
                            field: "Actions",
                            width: 100,
                            title: "Actions",
                            sortable: !1,
                            overflow: "visible",
                            template: function(t, e, a) {
                                var id = t._id;                              
                                id = '\'' + id + '\'';
                                var schemeId = t.schemeID;                              
                                schemeId = '\'' + schemeId + '\'';
                                var schemeName = t.schemeName;                              
                                schemeName = '\'' + schemeName + '\''; 

                                var btnhtml = '\t\t\t\t\t\t<div class="dropdown ' + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<a href="javscript:;" onclick="viewMutualFundDetails(' + id + ', ' + schemeId + ', ' + schemeName + ')" class="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip" title="View More Details" data-original-title="View Details"><em class="icon ni ni-eye"></em></a>\t\t\t\t\t &nbsp;&nbsp;&nbsp;&nbsp; <a href="javscript:;" onclick="buyMutualFund(' + id + ', ' + schemeId + ', ' + schemeName + ')" class="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip" title="Buy Fund" data-original-title="Buy Fund"><em class="icon ni ni-coins"></em></a>\t\t\t\t\t';
                                var temp = $.parseHTML(btnhtml);
                                return temp
                            }
                        }]
                    });
                    var a = t.getDataSourceQuery();

                     $("#m_form_status").on("change", function() {
                                var a = t.getDataSourceQuery();
                                a.risk = $(this).val().toLowerCase(), t.setDataSourceQuery(a), t.reload();
                                setTimeout(function() {
                                    a.risk = t.setDataSourceQuery(a), t.reload()
                                }, 500)
                    }), $("#m_form_status").selectpicker();
 
                    
                }()
            }
        };
        jQuery(document).ready(function() {
            DatatableRemoteAjaxDemo.init()
        })
    }
    getMutualFunds();


    /* View Mutual Fund Details */

    function viewMutualFundDetails(id, schemeId, schemeName) {

        console.log('ID', id);

        sessionStorage.setItem("triggerBuyMutualFundId", id);
        sessionStorage.setItem("triggerBuyMutualFundSchemeId", schemeId);
        sessionStorage.setItem("triggerBuyMutualFundSchemeName", schemeName);

        $('#viewMutualFundDetails').modal('show');

        var mutualFundListURL = 'https://api-finacomutualfund.azurewebsites.net/api/mutualFund';

            $.ajax({
                    type: "GET",
                    url: mutualFundListURL,
                    beforeSend: function (xhr) {
                       xhr.setRequestHeader('Authorization', 'Bearer ' + baseKey);
                    },
                    data: {},
                    success: function(result, textStatus, xhr) {

                            if(xhr.status == 200)
                            {          

                                console.log('Result :', result);

                                var singleMutualFund = result.filter(function (entry) {
                                    return entry._id === id;
                                });

                              console.log('Single Mutual Fund:', singleMutualFund);

                              $("#mutualFundDetailsLoader").hide();

                              $('#amcName').text(singleMutualFund[0].amcName);
                              $('#schemeName').text(singleMutualFund[0].schemeName);
                              $('.termMonth').text(singleMutualFund[0].termMonth);
                              $('.schemeStatus').text(singleMutualFund[0].status);

                              $('#fundDescription').text(singleMutualFund[0].fundDescription);
                              $('.schemeId').text(singleMutualFund[0].schemeID);
                              $('.buy_now_button').attr("id", singleMutualFund._id);



                              $('#minimumInvestment').text(singleMutualFund[0].minimumAmount);
                              $('.aumAmount').text(singleMutualFund[0].aum);
                              $('#isinId').text(singleMutualFund[0].ISIN);
                              $('#exchange').text(singleMutualFund[0].exchange);
                              $('#investmentType').text(singleMutualFund[0].category);

                              $('#fundCategory').text(singleMutualFund[0].fundCategory);
                              $('#rating').text(singleMutualFund[0].rating);


                              $('#nav').text(singleMutualFund[0].nav);
                              $('#riskCategory').text(singleMutualFund[0].risk);


                              $('#oneYearReturns').text(singleMutualFund[0].oneYrReturns);
                              $('#threeYearReturns').text(singleMutualFund[0].threeYrReturns);

                              $('#fiveYearReturns').text(singleMutualFund[0].fiveYrReturns);
                              $('#cgar').text(singleMutualFund[0].cgar);

                              $("#mutualFundDetailsContainer").show();

                            }

                    },
                    error: function(request, status, error) {
                            console.log('Request Demo Error :', error);
                            console.log('Request Demo Error Status :', status);
                            console.log('Request Demo Error Request :', request.status);
                    }
            });





    }




    /* Buy Mutual Fund */

    function buyMutualFund(id, schemeId, schemeName){
        console.log('Buy get ID :', id);

        console.log('Buy scheme Name:', schemeName);
        console.log('Buy scheme ID:', schemeId);

        sessionStorage.setItem("triggerBuyMutualFundId", id);
        sessionStorage.setItem("triggerBuyMutualFundSchemeId", schemeId);
        sessionStorage.setItem("triggerBuyMutualFundSchemeName", schemeName);

        $('.fundIntial').text(getNameIntial(schemeName));
        $('.buyFundName').text(schemeName);
        $('.buyScehemeId').text(schemeId);

        $('#buyMutualFund').modal('show');

    }


    function triggerBuy(){
    	var id = sessionStorage.getItem("triggerBuyMutualFundId");
    	var schemeId = sessionStorage.getItem("triggerBuyMutualFundSchemeId");
    	var schemeName = sessionStorage.getItem("triggerBuyMutualFundSchemeName");
    	$('#viewMutualFundDetails').modal('hide');
    	buyMutualFund(id,schemeId,schemeName);
    }


  


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
                var $inputs = $('#kycForm :input');
                if ($inputs) {
                    var values = {};
                    $inputs.each(function() {
                        values[this.name] = $(this).val();
                    });

                    console.log('Inside Form');

                    //t.addClass("block-ui-spinner");

				    	var amountToBeDeducted = $('#buy-amount').val();
				    	var paymentMethod = $('input[name="bs-method"]:checked').val();

				    	$('#buyMutualFund').modal('hide');

		    	        console.log('Payment Method :', paymentMethod);

				    	$('.amountToDeduct').text(amountToBeDeducted);
				        $('#confirmPaymentMethod').text(paymentMethod);

				        $('#buy-coin').modal('show');
                    
                    
                    }

                }
            });


formValidate("#buy-form");




		/* Confirm Order */

		$(document).ready(function() {

			$("#confirmOrder").on('click', function(event){
			    event.stopPropagation();
			    event.stopImmediatePropagation();

			    $('#buy-coin').modal('hide');

		    	var id = sessionStorage.getItem("triggerBuyMutualFundId");
		    	var schemeId = sessionStorage.getItem("triggerBuyMutualFundSchemeId");
		    	var schemeName = sessionStorage.getItem("triggerBuyMutualFundSchemeName");

		        var amountToBeDeducted = $('#buy-amount').val();
				var paymentMethod = $('input[name="bs-method"]:checked').val();

				var totalAmount = (Number(amountToBeDeducted) * 0.015 ) + 180;

				console.log('Fund Description :', $('#fundDescription').text());

				console.log('Fund Category :', $('#fundCategory').text());

				console.log('Total Amount :', totalAmount);


				var data = {

				  "schemeID": id,
				  "transactionType": 'deposit',
				  "schemeName": schemeName,
				  "fundDescription": $('#fundDescription').text(),
				  "category": $('#fundCategory').text(),
				  "paymentMethod": paymentMethod,
				  "price": Number(amountToBeDeducted),
				  "quantity": 1,
				  "amount": Number(amountToBeDeducted),
				  "subTotal": Number(amountToBeDeducted),
				  "processingFee": 120,
				  "tax": 60,
				  "brokerage": 1.5,
				  "grandTotal": Number(totalAmount),
				  "status": "completed",
				  "paymentFrom": $('#userFullName').text(),
				  "paymentTo": "Finaco Mutual Fund",
				  "details": "Payment has been successfully processed",
				}


				var createTransactionURL = 'https://api-finacomutualfund.azurewebsites.net/api/profile/transactions';

                $.ajax({
                    type: "POST",
                    url: createTransactionURL,
                    processData: false,
                    dataType: 'json',
                    contentType: 'application/json',
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + baseKey);
                    },
                    data: JSON.stringify(data),
                    success: function(result, textStatus, xhr) {

                            if(xhr.status == 200)
                            {          

                                console.log('Transaction Result :', result);

                                console.log('Deduct from account balance');


                                

                                $('#confirm-coin').modal('show');

  
                            }

                            $('#buy-form').trigger("reset");

                    },
                    error: function(request, status, error) {
                            console.log('Request Demo Error :', error);
                            console.log('Request Demo Error Status :', status);
                            console.log('Request Demo Error Request :', request.status);
                            $('#buy-form').trigger("reset");
                    }
                
                });





			


			});

		});
