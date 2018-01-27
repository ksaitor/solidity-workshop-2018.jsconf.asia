var ExchangeRates = artifacts.require('./ExchangeRates.sol');

contract('ExchangeRates', function(accounts) {
  let exchange;
  const owner = accounts[0];

  beforeEach('setup contract for each test', async function () {
    exchange = await ExchangeRates.new(accounts[0], accounts[1]);
  })

  it('2+2=4', async function () {
    assert.equal((2+2), 4);
  })

  it('sets gold price', async function () {
    await exchange.setGoldPrice(1000000000000000000, {from: accounts[0]});
    const goldPrice = await exchange.goldPrice.call();
    assert.equal(goldPrice, 1000000000000000000);
  })

  it('sets cash rate and gets price', async function () {
    await exchange.setGoldPrice(1000000000000000000, {from: accounts[0]});
    await exchange.setCashRate('SGD', 2*1000000000000000000, {from: accounts[1]});
    const response = await exchange.getGoldPrice('SGD');
    const price = response[0].toNumber();
    const ok = response[1];
    assert.equal(price, 2000000000000000000);
  })

})
