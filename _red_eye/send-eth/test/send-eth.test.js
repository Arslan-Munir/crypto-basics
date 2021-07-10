
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {abi, evm} = require('../compile');

let accounts;
let sendEther;

beforeEach(async () => {

    //  Get list of all accounts in local network
    accounts = await web3.eth.getAccounts();

    //  Use one of these accounts to deploy contract
    sendEther = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Send Ether', () => {
    it('contract deployed', () => {
        assert.ok(sendEther.options.address);
    });

    it('will sends money to account', async () => {

        const initialBalance = await web3.eth.getBalance(accounts[1]);

        await sendEther.methods.sendAmount(accounts[1]).send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const finalBalance = await web3.eth.getBalance(accounts[1]);

        const diff = finalBalance - initialBalance;

        // not exact of 2 ether, because of tiny amount of gas spent
        assert(diff > web3.utils.toWei('1.5', 'ether'));
    });
});