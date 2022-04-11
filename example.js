const {
  generateKey,
  signMessage,
  verifyMessage,
  privateToPublic,
} = require("./index");

const message = "Hello World!";
let publicKey;
let privateKey;

generateKey(5).then((key) => {
  publicKey = key.publicKey;
  privateKey = key.privateKey;
  console.log(key);

  privateToPublic(privateKey).then((pubKey) => {
    console.log("pubKey:", pubKey);
  });

  signMessage(message, privateKey).then((signature) => {
    console.log("signature:", signature);

    verifyMessage(message, signature, publicKey).then((verify) => {
      console.log("match:", verify);
    });
  });
});
