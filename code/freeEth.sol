contract freeEth {

    uint256 private balance=0;
    uint256 private RQUEST_AMOUNT= 1 ether;

    constructor() public payable {
        balance += msg.value;
    }

    function donate() public payable returns (uint) {
        balance += msg.value;
        return balance;
    }

    function request() public payable returns (uint remainingBal) {
        // Check enough balance available, otherwise just return balance
            balance -= RQUEST_AMOUNT;
            payable(msg.sender).transfer(RQUEST_AMOUNT);
        
        return balance;
    }

    function getBalance() public view returns (uint) {
        return balance;
    }

}