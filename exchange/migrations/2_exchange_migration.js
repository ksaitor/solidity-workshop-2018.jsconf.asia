var ExchangeRates = artifacts.require("./ExchangeRates.sol");

module.exports = function(deployer) {
  deployer.deploy(ExchangeRates);
};
