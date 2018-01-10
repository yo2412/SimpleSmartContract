pragma solidity ^0.4.0;

contract Zepnina{
    
    uint256 amount;
	address receiver = %receiver%;
    
    function Zepnina() public{
    }
	
    function () payable public{
        if(msg.value != 0){
            amount += msg.value;
        }    
    }
    
    function takeAmount(uint256 am) public{
        if(msg.sender == receiver){
            msg.sender.transfer(am);
        }
    }
    
    function receiverAddress() public constant returns (address t) {    
      return receiver;   
    }   
    
    function amountLeft() public constant returns (uint256 a) {    
      return amount;   
    }   
    
     
}

    // %receiver% zamenjaj z addresso prejemnika
