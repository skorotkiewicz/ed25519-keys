const { generateKey, signMessage, verifyMessage } = require("./index");

const message = "Hello World!";

const key = generateKey(5);
const publicKey = key.publicKey;
const privateKey = key.privateKey;
console.log(key);

const signature = signMessage(message, privateKey);
console.log("signature:", signature);

const verify = verifyMessage(message, signature, publicKey);
console.log("match:", verify);
