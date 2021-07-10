
const path = require('path');
const fs = require('fs');
const solc = require('solc');

// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

const inboxContractPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const inboxSource = fs.readFileSync(inboxContractPath, 'utf8');

var inboxConfigs = {
    language: 'Solidity',
    sources: {
        'inbox.sol': {
            content: inboxSource
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

module.exports = JSON.parse(solc.compile(JSON.stringify(inboxConfigs))).contracts['inbox.sol'].inbox;

// JSON.parse(solc.compile(JSON.stringify(inboxConfigs))).contracts['inbox.sol'].inbox.evm.bytecode.object;
// JSON.parse(solc.compile(JSON.stringify(inboxConfigs))).contracts['inbox.sol'].inbox.abi);
