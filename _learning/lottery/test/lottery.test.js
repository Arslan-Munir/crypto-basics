
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {abi, evm} = require('../compile');

let accounts;
let lottery;
const INITIAL_MESSAGE = 'Hi there';

beforeEach(async () => {

    //  Get list of all accounts in local network
    accounts = await web3.eth.getAccounts();

    //  Use one of these accounts to deploy contract
    lottery = await new web3.eth.Contract(abi)
    .deploy({data: evm.bytecode.object})
    .send({from: accounts[0], gas: '1000000'});
});

describe('Lottery', () => {
    it('contract deployed', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.strictEqual(accounts[0], players[0]);
        assert.strictEqual(1, players.length);
    })
    
    it('allows multiple accounts to enter', async () => {

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.03', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

        assert.strictEqual(accounts[0], players[0]);
        assert.strictEqual(accounts[1], players[1]);
        assert.strictEqual(2, players.length);
    });

    it('requires the min amount to send', async () => {

        try{
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 200
            });

        } catch(err) {
            assert(err);
        }
    });

    it('requires manager to pick winner', async () => {
        try {

            await lottery.methods.pickWinner().send({
                from: accounts[1]
            });
        } catch(err) {
            assert(err);
        }
    })

    it('sends money to winner and resets player array', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        const initialBalance = await web3.eth.getBalance(accounts[0]);

        await lottery.methods.pickWinner().send({
            from: accounts[0]
        });

        const finalBalance = await web3.eth.getBalance(accounts[0]);

        const diff = finalBalance - initialBalance;

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });


        // not exact of 2 ether, because of tiny amount of gas spent
        assert(diff > web3.utils.toWei('1.5', 'ether'));
        assert.strictEqual(0, players.length);

    });
});