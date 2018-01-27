var ExchangeRates = artifacts.require("./ExchangeRates.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(ExchangeRates, accounts[0], accounts[1]);
};
