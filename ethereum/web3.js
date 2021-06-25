import Web3 from "web3";
 
let web3;

if (typeof window !== 'undefined' && typeof (window.ethereum) !=='undefined'){
    //we are in browser && running metamask
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    // we are on the server *OR* user not running metamask
    const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/48e88f677ce34761aeee23a306eb9266'
    );
    web3 = new Web3(provider);
}

export default web3;