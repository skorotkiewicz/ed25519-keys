const { generateKey, signMessage, verifyMessage } = require("./index");

const message = "Hello World!";
let publicKey;
let privateKey;

test("generate key", () => {
  generateKey(5).then((key) => {
    publicKey = key.publicKey;
    privateKey = key.privateKey;
    expect(key).toBeDefined();
  });
});

test("sign message", () => {
  signMessage(message, privateKey).then((signature) => {
    expect(signature).toBeDefined();
  });
});

test("verify message", () => {
  signMessage(message, privateKey).then((signature) => {
    verifyMessage(message, signature, publicKey).then((verify) => {
      expect(verify).toBeTruthy();
    });
  });
});
