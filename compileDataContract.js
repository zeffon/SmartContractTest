const path = require('path');
const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const inboxNewPath = path.resolve(__dirname, 'contracts', 'InBoxNew.sol');
const source = fs.readFileSync(inboxNewPath, 'utf8');

const compileContracts = solc.compile(source, 1).contracts;
const dataCode = compileContracts[':DataContract'];

module.exports = dataCode;
