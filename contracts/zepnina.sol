pragma solidity ^0.4.0;


#
contract Zepnina{
    
    uint256 amount;
	// %reciver% zamenjaj z addresso prejemnika
	address reciver = %reciver%;
    
    function Zepnina() public{
    }
	
    function () payable public{
        if(msg.value != 0){
            amount += msg.value;
        }    
    }
    
    function takeAmount(uint256 am) public{
        if(msg.sender == reciver){
            msg.sender.transfer(am);
        }
    }
    
    function reciverAddress() public constant returns (address t) {    
      return reciver;   
    }   
    
    function amountLeft() public constant returns (uint256 a) {    
      return amount;   
    }   
    
     
}