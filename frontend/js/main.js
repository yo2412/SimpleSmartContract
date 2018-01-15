

var apiUrl = 'http://localhost:3000/';

function deployContract(){
  $.ajax({
    'url' : 'http://localhost:3000/api/deploy',
    'type' : 'GET',
    'success' : function(data) {
      
	  
	  var id = data;
	  checkStatus(id);
	  $("#spinner").show()
	  $("#form").hide()
	  
    }
  });
}

function checkStatus(id){
	
	$.ajax({
    'url' : apiUrl + 'api/status/'+id,
    'type' : 'GET',
    'success' : function(data) {
		  if(data != 'null'){
			  var link = "<a target='_blank' href='https://ropsten.etherscan.io/address/"+data+"'>"+data+"</a>";
			  $("#contId").text(link);
			  $("#alertDeploy").slideDown( "slow", function() {});
			  $("#spinner").hide()
				$("#form").show()
		  setTimeout(function(){
			  $("#alertDeploy").slideUp( "slow", function() {});
		  }, 15000);
		  
	  }else{
		  setTimeout(function(){
			 checkStatus(id); 
		  }, 1000);
		  
	  }
	  
	  
	  
    }
  });
	
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