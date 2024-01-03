// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

uint256 constant TOTAL_TICKETS = 10;
address constant EMPTY_ADDRESS = address(0x0);

contract Tickets {
    address public owner;

    struct Ticket {
        address owner;
        uint256 price;
    }

    Ticket[TOTAL_TICKETS] public tickets;

    constructor() {
        owner = msg.sender;
        for (uint256 i = 0; i < TOTAL_TICKETS; i++) {
            tickets[i].owner = EMPTY_ADDRESS;
            tickets[i].price = 1e17; //0.1 ETH
        }
    }

    function buyTicket(uint256 _index) external payable {
        require(_index < TOTAL_TICKETS && _index >= 0);
        require(tickets[_index].owner == EMPTY_ADDRESS);
        require(msg.value >= tickets[_index].price);

        tickets[_index].owner = msg.sender;
        // Transfer funds to the owner immediately
        payable(owner).transfer(address(this).balance);
    }
}
