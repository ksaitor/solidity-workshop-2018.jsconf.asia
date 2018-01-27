import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import ReactDOM from 'react-dom'

const contract = require('truffle-contract')
const ExchangeRates = contract(require('../build/contracts/ExchangeRates.json'))

ExchangeRates.setProvider(web3.currentProvider);

let account;
let accounts;

web3.eth.getAccounts(function(err, accs) {
  if (err != null || accs.length == 0) {
    return;
  }
  accounts = accs;
  account = accounts[0];
});


class App extends React.Component {
  constructor () {
    super();
    let self = this;
    this.state = {

    }

    ExchangeRates.deployed().then(function (instance) {
      instance.goldPrice.call().then((value) => {
        console.log('goldPrice is', value.toNumber());
      })
    })
  }


  render () {
    return <h1>Solidity Workshop</h1>;
  }
}



ReactDOM.render(<App />, document.getElementById('app'));
