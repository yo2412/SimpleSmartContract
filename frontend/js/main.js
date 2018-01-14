

var apiUrl = 'https://localhost:3000/';

function deployContract(){
  $.ajax({
    'url' : apiUrl + 'api/deploy',
    'type' : 'GET',
    'success' : function(data) {
      $("#alertDeploy").slideDown( "slow", function() {});
	  setTimeout(function(){
		  $("#alertDeploy").slideUp( "slow", function() {});
	  }, 5000);
    }
  });
  $("#alertDeploy").slideDown( "slow", function() {});
	  setTimeout(function(){
		  $("#alertDeploy").slideUp( "slow", function() {});
	  }, 5000);
}



function showDetails(){
	setEthAmount(5, 5000);
	setOwnerAddress("0x874b5456bd152966d634hn6bae1ffeb0411921e5");
	setOwnerName("Prvi uporabnik");
	setReciverAddress("0x874b5456bd152966d634hn6bae1ffeb0411921e5");
	setReciverName("Drugi uporabnik");
	setContractAddress("0x874b5456bd152966d634hn6bae1ffeb0411921e5");
	$("#infoMsg").hide();
	$("#details").show();
	
	
}

function setEthAmount(ethValue, usdValue){
	if(ethValue != undefined && usdValue != "" && usdValue != undefined && usdValue != ""){
		var text = ethValue + " ETH / " + usdValue + " USD";
		$("#ethAmount").text(text);
	}
}
function setOwnerAddress(address){
	if(address != undefined && address != ""){
		$("#ownerAddress").text(address);
		
	}
}
function setOwnerName(name){
	if(name != undefined && name != ""){
		$("#ownerName").text(name);
	}
}

function setReciverAddress(address){
	if(address != undefined && address != ""){
		$("#reciverAddress").text(address);
		
	}
}
function setReciverName(name){
	if(name != undefined && name != ""){
		$("#reciverName").text(name);
	}
}

function setContractAddress(address){
	if(address != undefined && address != ""){
		$("#contractAddress").text(address);
		$("#etherscanLink").attr('href', 'https://etherscan.io/txs?ca=' + address);
	}
}