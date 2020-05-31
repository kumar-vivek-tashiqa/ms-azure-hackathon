        //sessionStorage.setItem("finacoUserBaseKey", '');

        var baseKey = sessionStorage.getItem("finacoUserBaseKey");


        /* Get Date */

        function getDate(t){
        	var date = new Date(t);
            date = date.toString();
            date = date.substring(4, 10);
            return date;
        }


        /* Get Date Time*/

        function getDateTime(t){
        	var date = new Date(t);
            date = date.toString();
            var time = date.substring(11, 21);
            date = date.substring(4, 10);
            time = date + ' ' + time;
            return time;
        }


	    /* Get Name Intial */

	    function getNameIntial(n){
	        var sub = n.match(/\b\w/g) || [];
	        sub = ((sub.shift() || '') + (sub.pop() || '')).toUpperCase();
	        return sub;
	    }


        /* Check KYC Status */

        function checkKYCStatus(){

		    var authRequestURL = 'https://api-verifykyc.azurewebsites.net/api/kyc/profile/me';

		        $.ajax({
		            type: "GET",
		            url: authRequestURL,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Bearer ' + baseKey);
                    },
		            data: {},
		            success: function(result, textStatus, xhr) {



		                	if(xhr.status == 200)
		                	{	

		                		    var name = result.firstName+' '+result.lastName;

									$('.userInitial').text(getNameIntial(name));
									$('#userKYCStatus').text(result.status);
									$('.userFullName').text(name);
									$('#userEmailId').text(result.emailId);

									$('.kycUpdatedAt').text(getDate(result.updatedAt));
									$('.kycSubmittedAt').text(getDate(result.createdAt));

									$('.kycUpdatedDateTime').text(getDateTime(result.updatedAt));


		                			if(result.status == 'verified'){   
		                			   $('.kycApprovedAt').text(getDate(result.approvedAt));
		                			   $('.verifierComments').text(getDate(result.comments));
                					   $("#request-approved").show();    									     
									   $("#preloader").hide();
									   $(".nk-app-root").show();
		                		    }
		                		    else if(result.status == 'pending'){
		                		       $("#request-pending").show();    									     
									   $("#preloader").hide();
									   $(".nk-app-root").show();
		                		    }	                		  
		                		    else{
		                		       $('.verifierComments').text(getDate(result.comments));
                    				   $("#request-rejected").show();    									     
									   $("#preloader").hide();
									   $(".nk-app-root").show();
		                		    }
		                		
		                    } else {
		                    	    $("#welcome-content").show();    									     
									$("#preloader").hide();
									$(".nk-app-root").show();		             
		                    }

		            },
		            error: function(request, status, error) {
		                    console.log('Request Demo Error :', error);
		                    console.log('Request Demo Error Status :', status);
		                    console.log('Request Demo Error Request :', request);


		                    if(request.status == 400 || request.responseJSON.message == "KYC profile doesn't exist."){

		                    	console.log('KYC Profile does not exist');
		                    	$("#welcome-content").show();    									     
							    $("#preloader").hide();
							    $(".nk-app-root").show();
		                    }

		                    console.log('Unauthorized access. Logging out');
		                	
		                	//window.location.replace("./signin.html");		 
		            }
		        });
        }

        checkKYCStatus();


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
