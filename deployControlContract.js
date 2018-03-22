const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const ControlContract = require('./compileControlContract');

const provider = new HDWalletProvider(
  'potato escape drum comfort prosper melt puzzle marine dice worry nuclear outer',
  'https://rinkeby.infura.io/NZCtojoQuFcte9egrMvF'
);
const web3 = new Web3(provider);
const dataIntreface = ControlContract['interface'];
const dataBytecode = ControlContract['bytecode'];

const DATACONTRACT_ADDRESS = '0x13026Db5F3C4f38F6E902Aabb417AcA7D8D77bF0';

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const data = await new web3.eth.Contract(JSON.parse(dataIntreface))
    .deploy({
      data: dataBytecode,
      arguments: [DATACONTRACT_ADDRESS]
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });
  console.log('control ', data);
  console.log('control deploy to ', data.options.address);

  let balance = await data.methods.getBalance(DATACONTRACT_ADDRESS).call();
  console.log('the old balance is ', balance);

  balance = await data.methods.addTen(DATACONTRACT_ADDRESS).send({
    from: accounts[0],
    gas: '1000000'
  });
  console.log('add ten to balance ', balance);

  balance = await data.methods.getBalance(DATACONTRACT_ADDRESS).call();
  console.log('the new balance is ', balance);

};

deploy();
