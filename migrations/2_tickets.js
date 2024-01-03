const Tickets = artifacts.require("Tickets");

module.exports = async function (deployer) {
    await deployer.deploy(Tickets)
}