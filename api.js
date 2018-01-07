/* deploy smart contract */


const Web3 = require('web3');


class EthConnection {
	

	constructor () {
		/* Infura:
		 * https://ropsten.infura.io/9SIsltaS8WvvTGK9pjhG 
		 */
		
		this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/9SIsltaS8WvvTGK9pjhG"));

		
	}

	showState () {
		console.log(this.web3);	
	}

}

ethConnection = new EthConnection();

ethConnection.showState();
