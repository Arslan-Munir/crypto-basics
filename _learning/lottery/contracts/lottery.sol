pragma solidity >=0.7.0 <0.9.0;

contract lottery {
     address public manager;
     address payable[] private players;
     
     constructor() public {
         manager = msg.sender;
     }
     
     function enter() public payable {
         require(msg.value > 0.01 ether);
         
         players.push(payable(msg.sender));
     }
     
     function random() private view returns(uint){
         return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
     }
     
     function pickWinner() public {
         uint winner = random() % players.length;
         players[winner].transfer(address(this).balance);
         
         players = new address payable[](0);
     }
     
     function getPlayers() public view returns(address payable[] memory){
         return players;
     }
     
     modifier restrictedByManager() {
         require(msg.sender == manager);
         _;
     }
}