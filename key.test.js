const { generateKey, signMessage, verifyMessage } = require("./index");

const message = "Hello World!";
const key = generateKey(5);
const publicKey = key.publicKey;
const privateKey = key.privateKey;

test("generate key", () => {
  expect(key).toBeDefined();
});

test("sign message", () => {
  const signature = signMessage(message, privateKey);
  expect(signature).toBeDefined();
});

test("verify message", () => {
  const signature = signMessage(message, privateKey);
  const verify = verifyMessage(message, signature, publicKey);
  expect(verify).toBeTruthy();
});
