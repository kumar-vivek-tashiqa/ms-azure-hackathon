

var baseKey = sessionStorage.getItem("govtBaseKey");

function getDate(dt){

   var date = new Date(dt);
   date = date.toString();
   var time = date.substring(11, 21);
   date = date.substring(4, 10);
   time = date + ' ' + time;

   return time;
}


/* Get Bank Transactions */

var userTransactionURL = 'https://api-finacomutualfund.azurewebsites.net/api/govt/profile/transactions';

$("#m_form_status").change(function () {
    var end = this.value;
    var firstDropVal = $('#m_form_status').val();

    console.log('Dropdown Value :', firstDropVal);

    if( firstDropVal == 'frankin'){
      var userTransactionURL = 'https://api-frankinmutualfund.azurewebsites.net/api/govt/profile/transactions';
      getUserTransaction(userTransactionURL , 'frankin');
    }
    else{
      var userTransactionURL = 'https://api-finacomutualfund.azurewebsites.net/api/govt/profile/transactions';
      getUserTransaction(userTransactionURL , 'finaco');
    }

});



function getUserTransaction(URL, bankName) {

	console.log('URL Function :', URL);

  console.log('Bank Name :', bankName)

	$("#user_transaction_data").mDatatable("destroy");

	var DatatableRemoteAjaxDemo = {
            init: function() {
                ! function() {
                    var t = $("#user_transaction_data").mDatatable({
                        data: {
                            type: "remote",
                            source: {
                                read: {
                                    method: "GET",
                                    url: URL,
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
							input: $("#userTransactionSearch"),
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
                                            noRecords: ''
                                        }
                                    },
                        columns: [

                        {
                            field: "_id",
                            title: "Transaction ID",
                            width: 180
                        },
                        {
                            width: 220,
                            field: "transactionType",
                            title: "Transaction Type",
                            template: function(t) {
                               var output;
                               
                               var date = new Date(t.createdAt);
                               date = date.toString();
                               var time = date.substring(11, 21);
                               date = date.substring(4, 10);
                               time = date + ' ' + time;

                               if(t.transactionType == 'deposit'){
                                   output = '<div class="nk-tb-col"><div class="nk-tnx-type"><div class="nk-tnx-type-icon bg-success-dim text-success"><em class="icon ni ni-arrow-down-left"></em></div><div class="nk-tnx-type-text"><span class="tb-lead">Deposited Funds</span><br><span class="tb-date">"'+time+'"</span></div></div></div>'
                               }
                               else{
                                  output = '<div class="nk-tb-col"><div class="nk-tnx-type"><div class="nk-tnx-type-icon bg-danger-dim text-danger"><em class="icon ni ni-arrow-up-right"></em></div><div class="nk-tnx-type-text"><span class="tb-lead">Withdrawl Funds</span><br><span class="tb-date">"'+time+'"</span></div></div></div>'
                               }

                               return output
                            }
                        },
                         {
                            field: "schemeName",
                            title: "Scheme Name",
                            width: 170
                        }, {
                            field: "grandTotal",
                            title: "Total Amount",
                            width: 90
                        },
                        {
                            field: "paymentMethod",
                            title: "Payment Method",
                            width: 110
                        },

                         {
                            field: "status",
                            title: "Status",
                            width: 90,
                            template: function(t) {
                                var status = t.status.toLowerCase();
                                var a = {
                                    "active": {
                                        title: "Active",
                                        class: " m-badge--success"
                                    },
                                    "inactive": {
                                        title: "Inactive",
                                        class: " m-badge--danger"
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
                                var id = t._id;
                                id = '\'' + id + '\'';
                                var bank = bankName;
                                bank = '\'' + bank + '\'';

                                var btnhtml = '\t\t\t\t\t\t<div class="dropdown ' + (a.getPageSize() - e <= 4 ? "dropup" : "") + '">\t\t\t\t\t\t\t<a href="javscript:;" onclick="viewUserTransactions(' + id + ','+ bank +')" class="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip" title="View More Details" data-original-title="View Details"><em class="icon ni ni-eye"></em></a>\t\t\t\t\t&nbsp;&nbsp;&nbsp;<a href="javscript:;" onclick="viewBlockChainTransactions(' + id + ','+ bank +')" class="bg-white btn btn-sm btn-outline-light btn-icon btn-tooltip" title="View Blockchain Data" data-original-title="View Blockchain Data"><em class="icon ni ni-link"></em></a>\t\t\t\t\t';
                                var temp = $.parseHTML(btnhtml);
                                return temp
                            }
                        }

                        ]
                    });
                    var a = t.getDataSourceQuery();

                     $("#m_form_status").selectpicker();
 
                    
                }()
            }
        };
        jQuery(document).ready(function() {
            DatatableRemoteAjaxDemo.init()
        })
    }
    getUserTransaction(userTransactionURL , 'finaco');

    //$('#transactionDetails').modal('show');





    /* View User Transactions */

    function viewUserTransactions(id, bankName) {

        console.log('ID', id);

        console.log('view Bank :', bankName);

        $('#transactionDetails').modal('show');

        if(bankName == 'finaco'){
          var TransactionSingleUserURL = 'https://api-finacomutualfund.azurewebsites.net/api/govt/profile/transactions/';
        }
        else{
          var TransactionSingleUserURL = 'https://api-frankinmutualfund.azurewebsites.net/api/govt/profile/transactions/';
        }

        

        $.ajax({
                    type: "GET",
                    url: TransactionSingleUserURL,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', baseKey);
                    },
                    data: {},
                    success: function(result, textStatus, xhr) {

                            if(xhr.status == 200)
                            {          

                              console.log('Result :', result);

                              var singleTransaction = result.filter(function (entry) {
                                    return entry._id === id;
                              });

                              console.log('Result Approved:', singleTransaction);

                              $("#userDetailsLoader").hide();

                              $('.transactionId').text(singleTransaction[0]._id);
                              $('.grandTotal').text(singleTransaction[0].grandTotal);

                              $('#createdAt').text(singleTransaction[0].createdAt);
                              $('#schemeName').text(singleTransaction[0].schemeName);
                              $('#uniqueUserId').text(singleTransaction[0].uniqueUserId);
                              $('#amount').text(singleTransaction[0].amount);
                              $('#processingFee').text(singleTransaction[0].processingFee);

                              $('#tax').text(singleTransaction[0].tax);
                              $('#brokerage').text(singleTransaction[0].brokerage);
                              $('#processingFee').text(singleTransaction[0].processingFee);

                              $('#transactionType').text(singleTransaction[0].transactionType);
                              $('#paymentMethod').text(singleTransaction[0].paymentMethod);
                              $('#processingFee').text(singleTransaction[0].processingFee);

                              $('#paymentFrom').text(singleTransaction[0].paymentFrom);
                              $('#paymentTo').text(singleTransaction[0].paymentTo);
                              $('#fundDescription').text(singleTransaction[0].fundDescription);

                              $("#userDetailsContainer").show();

                            }

                    },
                    error: function(request, status, error) {
                            console.log('Request Demo Error :', error);
                            console.log('Request Demo Error Status :', status);
                            console.log('Request Demo Error Request :', request.status);
                            sessionStorage.setItem("govtBaseKey", '');
                    }
        });


    }





    /* View User Blockchain Details */

    function viewBlockChainTransactions(id, bankName) {

        console.log('ID', id);

        console.log('View Bank :', bankName);


        if(bankName == 'finaco'){
          var TransactionSingleUserURL = 'https://api-finacomutualfund.azurewebsites.net/api/govt/profile/transactions/';
        }
        else{
          var TransactionSingleUserURL = 'https://api-frankinmutualfund.azurewebsites.net/api/govt/profile/transactions/';
        }


        $('#userBlockChainDetails').modal('show');

        $.ajax({
                    type: "GET",
                    url: TransactionSingleUserURL,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', baseKey);
                    },
                    data: {},
                    success: function(result, textStatus, xhr) {

                            if(xhr.status == 200)
                            {          

                              
                              console.log('Result :', result);

                              var singleTransaction = result.filter(function (entry) {
                                    return entry._id === id;
                              });

                              console.log('Result Approved:', singleTransaction);

                              console.log('Blockchain Data :', singleTransaction[0].blockChain);

                              

                              var blockchainData = '{}';

                              console.log('Type :', typeof singleTransaction[0].blockChain[0]);

                              if(typeof singleTransaction[0].blockChain[0] != 'undefined' ){

                                 blockchainData = singleTransaction[0].blockChain[0].metadata;

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








