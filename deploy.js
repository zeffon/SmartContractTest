const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'potato escape drum comfort prosper melt puzzle marine dice worry nuclear outer',
  'https://rinkeby.infura.io/NZCtojoQuFcte9egrMvF'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!']
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });

  console.log('Contract deployed to', inbox.options.address);
};
deploy();
