// solhint-disable-next-line compiler-fixed, compiler-gt-0_4
pragma solidity ^0.4.17;


contract InboxData {

    mapping(address => string) public information;

    function setMessage(address targetAddress, string initialMessage) public {
        information[targetAddress] = initialMessage;
    }

    uint public count;

    function updateCount(uint newCount) public {
        count = newCount;
    }

}


contract InBoxControl {
    address public dataAddress;
    string public message;
    InboxData public inboxData;

    function InBoxControl(address initialAddress) public {
        inboxData = InboxData(initialAddress);
    }

    function setCount(uint newCount) public {
        inboxData.updateCount(newCount);
    }

    function getCount() public view returns(uint) {
        return inboxData.count();
    }

}


contract DataContract {
    mapping (address => uint256) public balanceOf;
    mapping (address => bool) private accessAllowed;

    function DataContract() public {
        accessAllowed[msg.sender] = true;
    }

    function setBlance(address _address, uint256 v) public {
        balanceOf[_address] = v;
    }

    modifier platform() {
        require(accessAllowed[msg.sender] == true);
        _;
    }

    function allowAccess(address _addr) public platform {
        accessAllowed[_addr] = true;
    }

    function denyAccess(address _addr)  public platform {
        accessAllowed[_addr] = false;
    }
}


contract ControlContract {

    DataContract public dataContract;

    function ControlContract(address _dataContractAddr) public {
        dataContract = DataContract(_dataContractAddr);
    }

    function addTen(address addr) public payable returns (uint) {
        uint256 balance = dataContract.balanceOf(addr) + 10;
        dataContract.setBlance(addr, balance);
        return dataContract.balanceOf(addr);
    }

    function getBalance(address addr) public view returns (uint) {
        return dataContract.balanceOf(addr);
    }

}
