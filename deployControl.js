const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const InBoxControl = require('./compileControl');

const provider = new HDWalletProvider(
  'potato escape drum comfort prosper melt puzzle marine dice worry nuclear outer',
  'https://rinkeby.infura.io/NZCtojoQuFcte9egrMvF'
);
const web3 = new Web3(provider);
const controlIntreface = InBoxControl['interface'];
const controlBytecode = InBoxControl['bytecode'];

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const data = await new web3.eth.Contract(JSON.parse(controlIntreface))
    .deploy({
      data: controlBytecode,
      arguments: ['0xD80315F03E2bdA3e458b083Fb749b6766D49aCA1']
    })
    .send({
      from: accounts[0],
      gas: '1000000'
    });
  console.log('control deploy to ', data.options.address);

  let count = await data.methods.getCount().call();
  console.log('the old count is ', count);
  count ++;
  await data.methods.setCount(count).send({
    from: accounts[0],
    gas: '1000000'
  });
  count = await data.methods.getCount().call();
  console.log('the new count is ', count);
};

deploy();
