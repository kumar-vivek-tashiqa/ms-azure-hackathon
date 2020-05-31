
var baseKey = sessionStorage.getItem("verifyKYCBaseKey");

function getDate(dt){

   var date = new Date(dt);
   date = date.toString();
   var time = date.substring(11, 21);
   date = date.substring(4, 10);
   time = date + ' ' + time;

   return time;
}




/* Get KYC profile */

function getKYCProfile() {

    var KYCProfileURL = 'https://api-verifykyc.azurewebsites.net/api/kyc/profile/all?status=verified';

    $("#user_kyc_data").mDatatable("destroy");

    var DatatableRemoteAjaxDemo = {
            init: function() {
                ! function() {
                    var t = $("#user_kyc_data").mDatatable({
                        data: {
                            type: "remote",
                            source: {
                                read: {
                                    method: "GET",
                                    url: KYCProfileURL,
                                    headers: {
                                      'Authorization': baseKey
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
                            input: $("#userGeneralSearch"),
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
                                    width: 80,
                                    field: "uniqueUserId",
                                    title: "User Avatar",
                                    template: function(t) {
                                        var output;

                                            var n = t.firstName+' '+t.lastName;
                                            var sub = n.match(/\b\w/g) || [];
                                            sub = ((sub.shift() || '') + (sub.pop() || '')).toUpperCase();

                                            var s = ["success", "brand", "danger", "accent", "warning", "metal", "primary", "info"][Math.floor(Math.random() * 8)];
                                            output = '<center><div class="m-card-user m-card-user--sm">\t\t\t\t\t\t\t\t<div class="m-card-user__pic">\t\t\t\t\t\t\t\t\t<div style="width: 40px; -webkit-border-radius: 100%; -webkit-justify-content: center; display: flex; -webkit-align-items: center; font-size: 0.96rem; font-weight: 400;color: white; height: 40px;"class="m-card-user__no-photo m--bg-fill-' + s + '"><span>' + sub + '</span></div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div></center>'
                                        
                                        return output
                                    }
                                },
                        {
                            field: "firstName",
                            title: "First Name",
                            width: 100
                        }, {
                            field: "lastName",
                            title: "Last Name",
                            width: 100
                        }, {
                            field: "emailId",
                            title: "Email ID",
                            width: 190
                        }, 
                        {
                            width: 120,
                            field: "phoneNumber",
                            title: "Contact Number",
                            template: function(t) {
                                var a = '+' + t.phoneNumber;
                                return a
                            }
                        },
                        {
                            field: "panNumber",
                            title: "PAN Number",
                            width: 100
                        }, 

                         {
                            field: "proofOfAddress.documentType",
                            title: "Document Type",
                            width: 100
                        },

                        {
                            width: 220,
                            field: "_id",
                            title: "Uploaded Documents",
                            template: function(t) {
                               var output;
                               output = '<div class="nk-tb-col tb-col-md p-0"><ul class="list-inline list-download">\t\t\t\t\t\t\t\t<li>Front Side <a href="'+t.proofOfAddress.frontImageURL+'" class="popup"><em class="icon ni ni-download"></em></a></li>\t\t\t\t\t\t\t\t<li>Back Side <a href="'+t.proofOfAddress.frontImageURL+'" class="popup"><em class="icon ni ni-download"></em></a></li>\t\t\t\t\t\t\t\t</ul>\t\t\t\t\t\t\t\t</div>'
                               return output
                            }
                        },

                         {
                            field: "createdAt",
                            title: "Submitted",
                            width: 120,
                            template: function(t) {
                                var date = new Date(t.createdAt);
                                date = date.toString()

                                var d = date.substring(4, 10);
                                var time = date.substring(11, 21);
                                time = d + ' ' + time;
                                return '' + time + ''
                            }
                         },

                         {
                            field: "status",
                            title: "KYC Status",
                            width: 90,
                            template: function(t) {
                                var status = t.status.toLowerCase();
                                var a = {
                                    "verified": {
                                        title: "Verified",
                                        class: " m-badge--success"
                                    },
                                    "rejected": {
                                        title: "Rejected",
                                        class: " m-badge--danger"
                                    },
                                    "pending": {
                                        title: "Pending",
                                        class: " m-badge--warning"
                                    }
                                };
                                return '<span class="m-badge ' + a[status].class + ' m-badge--wide">' + a[status].title + "</span>"
                            }
                        },
                        {
                            field: "Actions",
                            width: 80,
                            title: "Actions",
                            sortable: !1,
                            overflow: "visible",
                            template: function(t, e, a) {
                                var id = t.uniqueUserId;                              
                                id = '\'' + id + '\'';                              
                                var btnhtml = '\t\t\t\t\t\t<div class="dropdown ' + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<a href="javscript:;" onclick="viewUserDetails(' + id + ')" class="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip" title="View More Details" data-original-title="View Details"><em class="icon ni ni-eye"></em></a>\t\t\t\t\t &nbsp;&nbsp;&nbsp;\t\t\t\t\t<a href="javscript:;" onclick="viewUserBlockchainDetails(' + id + ')" class="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip" title="View BlockChain" data-original-title="View BlockChain"><em class="icon ni ni-link"></em></a>\t\t\t\t\t';
                                var temp = $.parseHTML(btnhtml);
                                return temp
                            }
                        }]
                    });
                    var a = t.getDataSourceQuery();

                     $("#m_form_status").on("change", function() {
                                var a = t.getDataSourceQuery();
                                a.status = $(this).val().toLowerCase(), t.setDataSourceQuery(a), t.reload();
                                setTimeout(function() {
                                    a.status = t.setDataSourceQuery(a), t.reload()
                                }, 500)
                    }), $("#m_form_status").selectpicker();
 
                    
                }()
            }
        };
        jQuery(document).ready(function() {
            DatatableRemoteAjaxDemo.init()
        })
    }
    getKYCProfile();




    /* View User Profile */

    function viewUserDetails(id) {

        console.log('ID', id);

        $('#userDetails').modal('show');

        //var t = $("#card-content");

        //t.addClass("block-ui-spinner");

	    //t.removeClass("block-ui-spinner");

        var KYCSingleUserURL = 'https://api-verifykyc.azurewebsites.net/api/kyc/profile/user/'+id;

        $.ajax({
                    type: "GET",
                    url: KYCSingleUserURL,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', baseKey);
                    },
                    data: {},
                    success: function(result, textStatus, xhr) {

                            if(xhr.status == 200)
                            {          

                              console.log('Result :', result);

                              $("#userDetailsLoader").hide();

                              $('.fullName').text(result.firstName+' '+result.lastName);
                              $('.submittedAt').text(getDate(result.createdAt));

                              $('#kycId').text(result._id);
                              $('#panNumber').text(result.panNumber);
                              $('#updatedAt').text(getDate(result.updatedAt));
                              $('#documentType').text(result.proofOfAddress.documentType);
                              $('#documentId').text(result.proofOfAddress.documentId);

                              $("#front_image_url").attr("href", result.proofOfAddress.frontImageURL);
                              $("#back_image_url").attr("href", result.proofOfAddress.backImageURL);

                              $('#firstName').text(result.firstName);
                              $('#lastName').text(result.lastName);
                              $('#fatherName').text(result.fathersFullName);
                              $('#motherName').text(result.mothersFullName);

                              $('#emailId').text(result.emailId);
                              $('#phoneNumber').text(result.phoneNumber);
                              $('#dob').text(result.dateOfBirth);

                              $('#gender').text(result.gender);
                              $('#maritalStatus').text(result.maritalStatus);
                              $('#occupationType').text(result.occupationType);
                              $('#residentialStatus').text(result.residentialStatus);
                              $('#addressType').text(result.address.addressType);

                              $('#address').text(result.address.addressLine1);
                              $('#city').text(result.address.city);
                              $('#country').text(result.address.country);
                              $('#state').text(result.address.state);
                              $('#zipCode').text(result.address.zipCode);

                              $("#userDetailsContainer").show();

                            }

                    },
                    error: function(request, status, error) {
                            console.log('Request Demo Error :', error);
                            console.log('Request Demo Error Status :', status);
                            console.log('Request Demo Error Request :', request.status);
                    }
        });


    }










    /* View User Blockchain Details */

    function viewUserBlockchainDetails(id) {

        console.log('ID', id);

        $('#userBlockChainDetails').modal('show');


        var KYCSingleUserURL = 'https://api-verifykyc.azurewebsites.net/api/kyc/profile/user/'+id;

        $.ajax({
                    type: "GET",
                    url: KYCSingleUserURL,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', baseKey);
                    },
                    data: {},
                    success: function(result, textStatus, xhr) {

                            if(xhr.status == 200)
                            {          

                              console.log('Result :', result);

                              console.log('Blockchain Data :', result.blockChain);

                              var blockchainData = '{}';

                              console.log('Type :', typeof result.blockChain[0]);

                              if(typeof result.blockChain[0] != 'undefined' ){

                                 blockchainData = result.blockChain[0].metadata;

                              }
                              else{
                                 blockchainData = {'message':'No Information Found'};
                              }

                              blockchainData = JSON.stringify(blockchainData);

                              $("#userBlockChainDetailsLoader").hide();
                              $("#jsonData").html("");
                              make(blockchainData);
                       
                              $("#userBlockChainDetailsContainer").show();

                            }

                    },
                    error: function(request, status, error) {
                            console.log('Request Demo Error :', error);
                            console.log('Request Demo Error Status :', status);
                            console.log('Request Demo Error Request :', request.status);
                    }
        });


    }



function make(data){
  let crashed = false;
  try{
    JSON.parse(data);
  }
  catch(e){
    write(e);
    setTimeout(()=>{
      document.body.innerHTML = document.body.innerHTML.replace(`<h1>${e}</h1>`,"");
 console.log(document.body.innerText);
    }, 4000);
    crashed = true;
  }
  finally{
    if(!crashed){
      let json = JSON.parse(data);
      if(Array.isArray(json)){
        document.body.innerHTML += "<div><span class='level-1'>[</span>";
        for (var k in json) {
          document.body.innerHTML += "<div><span class='level-2'>{</span>";
          for (var j in json[k]) {
            let val = `"${json[k][j]}"`;
            let cv = "of"; //class value
            if(parseInt(json[k][j])){
              cv = "number";
              val = json[k][j];
            }
            let comma = (Object.keys(json[k])[Object.keys(json[k]).length-1] == j) ? "":",";
            let str = `<span class='in'>"${j}"</span>:<span class='${cv}'>${val}</span>${comma}`;
            print(str);
            // console.log(json[k].length == json.indexOf(json[k][j]));
          }//#39b3ff
          let val = "},";
          if(json.length-1 == json.indexOf(json[k])){
            val = "}";
          }
          document.body.innerHTML += `<span class='level-2'>${val}</span></div>`;
        }
      }
      else{
        for (i in json) {
          let t = `"${i}":"${json[i]},"`
          write(t);
        }
      }
      if(Array.isArray(json)){
        document.body.innerHTML += "<span style='display:block' class='level-1'>]</span></div>";
      }
    }
  }
}

function print(data){
  let k = document.createElement("p");
  k.innerHTML = data;
  
  $("#jsonData").append(k);
  
}

function write(data){
  let k = document.createElement("p");
  let b = document.createTextNode(data);
  k.appendChild(b);
  $("#jsonData").append(k);
  
}






