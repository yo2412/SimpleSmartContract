/* deploy smart contract */

const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

const contracts = {
    "Zepnina": "Zepnina.sol"
}

const debug = true;


module.exports = class EthConnection {
    
    constructor() {
        /* Infura:
         * https://ropsten.infura.io/9SIsltaS8WvvTGK9pjhG 
         */
        this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/9SIsltaS8WvvTGK9pjhG"));
    }

    getBlock() {
        this.web3.eth.getBlockNumber().then(console.log);
    }
    

    deployContract(privateKey, contractName, replaceParams) {
        
        var account = this.web3.eth.accounts.wallet.add(privateKey);

        var input = fs.readFileSync("contracts/" + contracts[contractName]);
        var inputString = input.toString();

        for (let paramName in replaceParams) {
        	
        	if (debug) { console.log("api.js :: replacing " + paramName + " with " + replaceParams[paramName]); }
        	inputString = inputString.replace("%" + paramName + "%", replaceParams[paramName]);
        }

        // if(debug) { console.log(inputString); }

        var compiledContract = solc.compile(inputString, 1);
        //if (debug) { console.log(compiledContract); }
 

        var bytecode = compiledContract.contracts[":"+contractName].bytecode;
        var abi = JSON.parse(compiledContract.contracts[":"+contractName].interface);


        var contractWrapper = new this.web3.eth.Contract(abi);

        console.log("api.js :: Attempting deployment of " + contractName);



		return new Promise(function(resolve, reject) {
        	var contractInstance = contractWrapper.deploy({
            	data: "0x" + bytecode,
            	arguments: []
          	}).send( {
            	from: account.address,
            	gas: 1500000
          	}).then( (res) => {
            	console.log("api.js :: deployed @ " + res.options.address);
            	resolve(res.options.address)
          	});
      	});

      	/*

        var contractInstance = contractWrapper.deploy({
        	data: "0x" + bytecode,
        	arguments: []
        }).send( {
        	from: account.address,
        	gas: 1500000
        }).then( (res) => {
        	console.log(res.options.address);
        });
		*/
    }
}
/*
ethConnection = new EthConnection();
ethConnection.deployContract("0xca8b218de3ae8cba66fc3fd81d80d9bda9fead4f85d49ae7baa8a9b484da0e1c", "Zepnina", {
	"receiver": "0x874b54a8bd152966d63f706bae1ffeb0411921e5"
}).then()*/