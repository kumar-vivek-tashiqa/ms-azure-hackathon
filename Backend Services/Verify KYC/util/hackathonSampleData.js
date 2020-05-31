module.exports = {
  createKYCTransaction: function () {
    return new Promise(function (resolve, reject) {
      var object = [
        {
           "metadata":{
              "contractAddress":"0xe6182d46F9Bb91f04F564C44dfDc2C810F07764e",
              "creatorAccount":"0x2ad0657B1e4221A65d0f0D01c582085e972Afcde",
              "bytecode":"0x608060405234801561001057600080fd5b506040516109e03803806109e08339818101604052602081101561003357600080fd5b810190808051604051939291908464010000000082111561005357600080fd5b8382019150602082018581111561006957600080fd5b825186600182028301116401000000008211171561008657600080fd5b8083526020830192505050908051906020019080838360005b838110156100ba57808201518184015260208101905061009f565b50505050905090810190601f1680156100e75780820380516001836020036101000a031916815260200191505b506040525050508060029080519060200190610104929190610196565b5060008060006101000a81548160ff0219169083600181111561012357fe5b02179055507f8fbf346523616c015d34c71713ea41bb98008282341b0f191f578d20d7ed26e26040518080602001828103825260078152602001807f526571756573740000000000000000000000000000000000000000000000000081525060200191505060405180910390a15061023b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101d757805160ff1916838001178555610205565b82800160010185558215610205579182015b828111156102045782518255916020019190600101906101e9565b5b5090506102129190610216565b5090565b61023891905b8082111561023457600081600090555060010161021c565b5090565b90565b6107968061024a6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063d181ada11161005b578063d181ada11461027b578063e750e2da146102c5578063f1b6dccd14610348578063fd05116c146103745761007d565b80635ab28ecb14610082578063829c2d6d14610105578063a7a1ba15146101c0575b600080fd5b61008a6103be565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100ca5780820151818401526020810190506100af565b50505050905090810190601f1680156100f75780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6101be6004803603602081101561011b57600080fd5b810190808035906020019064010000000081111561013857600080fd5b82018360208201111561014a57600080fd5b8035906020019184600183028401116401000000008311171561016c57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929050505061045c565b005b610279600480360360208110156101d657600080fd5b81019080803590602001906401000000008111156101f357600080fd5b82018360208201111561020557600080fd5b8035906020019184600183028401116401000000008311171561022757600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610542565b005b6102836105c0565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102cd6105e6565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561030d5780820151818401526020810190506102f2565b50505050905090810190601f16801561033a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610350610684565b6040518082600181111561036057fe5b60ff16815260200191505060405180910390f35b61037c610696565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104545780601f1061042957610100808354040283529160200191610454565b820191906000526020600020905b81548152906001019060200180831161043757829003601f168201915b505050505081565b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600390805190602001906104b39291906106bc565b5060016000806101000a81548160ff021916908360018111156104d257fe5b02179055507f8fbf346523616c015d34c71713ea41bb98008282341b0f191f578d20d7ed26e26040518080602001828103825260088152602001807f526573706f6e736500000000000000000000000000000000000000000000000081525060200191505060405180910390a150565b33600060016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600290805190602001906105999291906106bc565b5060008060006101000a81548160ff021916908360018111156105b857fe5b021790555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60028054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561067c5780601f106106515761010080835404028352916020019161067c565b820191906000526020600020905b81548152906001019060200180831161065f57829003601f168201915b505050505081565b6000809054906101000a900460ff1681565b600060019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106106fd57805160ff191683800117855561072b565b8280016001018555821561072b579182015b8281111561072a57825182559160200191906001019061070f565b5b509050610738919061073c565b5090565b61075e91905b8082111561075a576000816000905550600101610742565b5090565b9056fea265627a7a7231582030a25413319a49378c360b775b2a97487b00e6c64d8aa2ec09ceb2c6b04a4adf64736f6c63430005100032",
              "txHistory":"0xc9e1857ef9e0424896fbee1d611455944e0eb78b56c93a0ee93a46cdb99e48f4",
              "events":"0x8fbf346523616c015d34c71713ea41bb98008282341b0f191f578d20d7ed26e2"
           }
        },
        {
           "inputs":[
              {
                 "internalType":"string",
                 "name":"transaction",
                 "type":"string"
              }
           ],
           "payable":false,
           "stateMutability":"nonpayable",
           "type":"constructor"
        },
        {
           "anonymous":false,
           "inputs":[
              {
                 "indexed":false,
                 "internalType":"string",
                 "name":"stateData",
                 "type":"string"
              }
           ],
           "name":"StateChanged",
           "type":"event",
           "signature":"0x8fbf346523616c015d34c71713ea41bb98008282341b0f191f578d20d7ed26e2"
        },
        {
           "constant":true,
           "inputs":[
     
           ],
           "name":"Transaction",
           "outputs":[
              {
                 "internalType":"string",
                 "name":"",
                 "type":"string"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function",
           "signature":"0xe750e2da",
           "value":"",
           "enumsInfo":{
              "fields":{
                 "State":[
                    {
                       "name":"Completed",
                       "value":1
                    }
                 ]
              },
              "methods":{
     
              }
           }
        },
        {
           "constant":true,
           "inputs":[
     
           ],
           "name":"Transactor",
           "outputs":[
              {
                 "internalType":"address",
                 "name":"",
                 "type":"address"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function",
           "signature":"0xfd05116c",
           "value":"",
           "enumsInfo":{
              "fields":{
                 "State":[
                    {
                       "name":"Request",
                       "value":0
                    },
                    {
                       "name":"Respond",
                       "value":1
                    }
                 ]
              },
              "methods":{
     
              }
           }
        },
        {
           "constant":true,
           "inputs":[
     
           ],
           "name":"Transactor",
           "outputs":[
              {
                 "internalType":"address",
                 "name":"",
                 "type":"address"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function",
           "signature":"0xd181ada1",
           "value":"",
           "enumsInfo":{
              "fields":{
                 "State":[
                    {
                       "name":"Completed",
                       "value":1
                    }
                 ]
              },
              "methods":{
     
              }
           }
        },
        {
           "constant":true,
           "inputs":[
     
           ],
           "name":"ResponseMessage",
           "outputs":[
              {
                 "internalType":"string",
                 "name":"",
                 "type":"string"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function",
           "signature":"0x5ab28ecb",
           "value":"",
           "enumsInfo":{
              "fields":{
                 "State":[
                    {
                       "name":"Completed",
                       "value":1
                    }
                 ]
              },
              "methods":{
     
              }
           }
        },
        {
           "constant":true,
           "inputs":[
     
           ],
           "name":"State",
           "outputs":[
              {
                 "internalType":"enum Transaction.StateType",
                 "name":"",
                 "type":"uint8"
              }
           ],
           "payable":false,
           "stateMutability":"view",
           "type":"function",
           "signature":"0xf1b6dccd",
           "value":"",
           "enumsInfo":{
              "fields":{
                 "State":[
                    {
                       "name":"Completed",
                       "value":1
                    }
                 ]
              },
              "methods":{
     
              }
           }
        },
        {
           "constant":false,
           "inputs":[
              {
                 "internalType":"string",
                 "name":"requestTransaction",
                 "type":"string"
              }
           ],
           "name":"SendTransaction",
           "outputs":[
     
           ],
           "payable":false,
           "stateMutability":"nonpayable",
           "type":"function",
           "signature":"0xa7a1ba15"
        },
        {
           "constant":false,
           "inputs":[
              {
                 "internalType":"string",
                 "name":"responseTransaction",
                 "type":"string"
              }
           ],
           "name":"SendTransaction",
           "outputs":[
     
           ],
           "payable":false,
           "stateMutability":"nonpayable",
           "type":"function",
           "signature":"0x829c2d6d"
        }
     ];

     object[0].metadata.contractAddress = object[0].metadata.contractAddress + Math.random().toString(36).toUpperCase().slice(2);
     object[0].metadata.creatorAccount = object[0].metadata.contractAddress + Math.random().toString(36).toUpperCase().slice(2);
     object[0].metadata.bytecode = object[0].metadata.contractAddress + Math.random().toString(36).toUpperCase().slice(2);
     object[0].metadata.txHistory = object[0].metadata.contractAddress + Math.random().toString(36).toUpperCase().slice(2);
     object[0].metadata.events = object[0].metadata.contractAddress + Math.random().toString(36).toUpperCase().slice(2);

     resolve(object);

    });
  }
};
