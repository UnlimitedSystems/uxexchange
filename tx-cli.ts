const WavesAPI = require('waves-api');

WavesAPI.TESTNET_CONFIG.nodeAddress = 'http://127.0.0.1:6861';
WavesAPI.TESTNET_CONFIG.matcherAddress = 'http://127.0.0.1:6862';

const Waves = WavesAPI.create(WavesAPI.TESTNET_CONFIG);

function parseArguments() {
    const result = Object.create(null);
    process.argv.forEach((argument) => {
        if (argument.indexOf('=') != -1) {
            const index = argument.indexOf('=');
            const name = argument.substr(0, index);
            const value = argument.substr(index + 1);
            result[name] = value;
        } else {
            result[argument] = true;
        }
    });    
    return result;
}

const args=parseArguments();

console.info(args);

if (!args.to || !args.amount) {
    console.info("Usage: tx-cli <to> <value>");
    process.exit()
}

const keyPair = {
    privateKey: 'EXKwLZybgit3uKddrMDNBXXES4P2prUmMPqHMWpyY1V5',
    publicKey: '3tWuqg9syHTsdmNNmwUbguLUhnpyE5AS4rpkojgm6aw2' 
};

let attach='';
if (args.attach) {
    attach = args.attach;
}

// 10070000000
const tx = {
    // recipient: '3NNQxWojKFQT1gtR6fqefbq1hpwPijkDG2P',
    recipient: args.to,
    assetId: 'WAVES',
    amount: parseInt(args.amount),
    feeAssetId: 'WAVES',
    fee: 100000,
    attachment: attach,
    timestamp: Date.now()
};

console.info("Sending %d %s to %s", tx.amount, tx.assetId, tx.recipient);

Waves.API.Node.v1.assets.transfer(tx, keyPair).then((responseData) => {
    console.log("Your Transaction has been sent");
    console.log("Details: ", responseData);
}, (error) => {
    console.error("Your Transaction could not be sent");
    console.error("Details: ", error);
});
