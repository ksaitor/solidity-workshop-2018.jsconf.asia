pragma solidity ^0.4.19;
contract ExchangeRates {
    address goldSource;
    address cashSource;
    
    mapping (string => uint256) cashRates;
    mapping (string => bool) cashReady;

    uint256 public goldPrice;
    bool public goldReady;
    
    function ExchangeRates(address goldSource_, address cashSource_) public {
        goldSource = goldSource_;
        cashSource = cashSource_;
    }
    
    function setGoldPrice(uint newPrice) public {
        require(msg.sender == goldSource);
        goldPrice = newPrice;
        goldReady = true;
    }
    
    function setCashRate(string currency, uint256 rate) public {
        require(msg.sender == cashSource);
        cashRates[currency] = rate;
        cashReady[currency] = true;
    }
    
    function getGoldPrice(string currency) public view returns (uint256 price, bool ok) {
        if (!cashReady[currency]) return;
        if (!goldReady) return;
        price = cashRates[currency] * goldPrice / 1 ether;
        ok = true;
    }
}
