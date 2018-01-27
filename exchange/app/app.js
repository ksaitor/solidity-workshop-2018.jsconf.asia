import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { Container, Button, Statistic } from 'semantic-ui-react'

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
    this.state = {
      goldPrice: false
    }
    this.getGoldPrice = this.getGoldPrice.bind(this)
  }

  getGoldPrice() {
    let self = this;
    ExchangeRates.deployed().then(function (instance) {
      instance.goldPrice.call().then((value) => {
        self.setState({goldPrice: value.toNumber() });
      })
    })
  }


  render () {
    return <Container>
      <h1>Solidity Workshop</h1>
      <Statistic label='Gold price' value={this.state.goldPrice} />
      <br/>
      <Button onClick={this.getGoldPrice} color='blue'>Get Gold Price</Button>
    </Container>;
  }
}



ReactDOM.render(<App />, document.getElementById('app'));
