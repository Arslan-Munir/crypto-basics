
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'send-eth.sol');
const source = fs.readFileSync(contractPath, 'utf8');

var configs = {
    language: 'Solidity',
    sources: {
        'send-eth.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

module.exports = JSON.parse(solc.compile(JSON.stringify(configs))).contracts['send-eth.sol'].sendEther;

// JSON.parse(solc.compile(JSON.stringify(configs))).contracts['send-eth.sol'].lottery.evm.bytecode.object;
// JSON.parse(solc.compile(JSON.stringify(configs))).contracts['send-eth.sol'].lottery.abi);
