
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'lottery.sol');
const source = fs.readFileSync(contractPath, 'utf8');

var lotteryConfigs = {
    language: 'Solidity',
    sources: {
        'lottery.sol': {
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

module.exports = JSON.parse(solc.compile(JSON.stringify(lotteryConfigs))).contracts['lottery.sol'].lottery;

// JSON.parse(solc.compile(JSON.stringify(inboxConfigs))).contracts['inbox.sol'].lottery.evm.bytecode.object;
// JSON.parse(solc.compile(JSON.stringify(inboxConfigs))).contracts['inbox.sol'].lottery.abi);
