const WavesAPI = require('waves-api');

WavesAPI.TESTNET_CONFIG.nodeAddress = 'http://127.0.0.1:6861';
WavesAPI.TESTNET_CONFIG.matcherAddress = 'http://127.0.0.1:6862';

const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);

const keyPair = {
    privateKey: 'EXKwLZybgit3uKddrMDNBXXES4P2prUmMPqHMWpyY1V5',
    publicKey: '3tWuqg9syHTsdmNNmwUbguLUhnpyE5AS4rpkojgm6aw2' 
};

const tx = {
    // An arbitrary address; mine, in this example
    recipient: '3NNQxWojKFQT1gtR6fqefbq1hpwPijkDG2P',
    // ID of a token, or WAVES
    assetId: 'WAVES',
    // The real amount is the given number divided by 10^(precision of the token)
    amount: 10070000000,
    // The same rules for these two fields
    feeAssetId: 'WAVES',
    fee: 100000,
    // 140 bytes of data (it's allowed to use Uint8Array here)
    attachment: '',
    timestamp: Date.now()
};

Waves.API.Node.v1.assets.transfer(tx, keyPair).then((responseData) => {
    console.log(responseData);
});
