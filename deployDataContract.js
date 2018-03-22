const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const DataContract = require('./compileDataContract');

const provider = new HDWalletProvider(
  'potato escape drum comfort prosper melt puzzle marine dice worry nuclear outer',
  'https://rinkeby.infura.io/NZCtojoQuFcte9egrMvF'
);
const web3 = new Web3(provider);
const dataIntreface = DataContract['interface'];
const dataBytecode = DataContract['bytecode'];

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const data = await new web3.eth.Contract(JSON.parse(dataIntreface))
    .deploy({
      data: dataBytecode,
      arguments: []
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });
  console.log('data deploy to ', data.options.address);

};

deploy();
