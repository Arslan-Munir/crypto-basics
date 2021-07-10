pragma solidity >=0.7.0 <0.9.0;

contract sendEther {
    
    function sendAmount(address payable receiverAddress) public payable {
        require(msg.value > 0);
        
        receiverAddress.transfer(msg.value);
    }
}