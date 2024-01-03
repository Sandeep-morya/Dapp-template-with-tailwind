const Tickets = artifacts.require("Tickets");

contract("Tickets", function ([owner]) {
    it("should allow a user to buy a ticket", async function () {
        const instance = await Tickets.deployed();
        const orginalTicket = await instance.tickets(0);

        await instance.buyTicket(0, { from: owner, value: orginalTicket.price });
        const updatedTicket = await instance.tickets(0);
        assert.equal(updatedTicket.owner, owner)
    });
});
