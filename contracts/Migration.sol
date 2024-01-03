// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Migration {
    address public owner;
    uint public last_completed_migrations;

    constructor() {
        owner = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == owner, "Restricted By Owner");
        _;
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migrations = completed;
    }
}
