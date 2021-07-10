
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {abi, evm} = require('./compile');

// unlock an acc and endpoint for node
const provider = new HDWalletProvider(
    'trip kiss execute pulp cradle gentle brass plate taxi quote memory science',
    'https://rinkeby.infura.io/v3/fa534cb3e92c4e25b370d752bcbe3f45'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("deply from", accounts);

    const result = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object})
    .send({from: accounts[0], gas: '1000000'});

    console.log(result.options.address);
}

deploy();
