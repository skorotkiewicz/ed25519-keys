const elliptic = require("elliptic");
const { eddsa: EdDSA } = elliptic;

const ec = new EdDSA("ed25519");

function toHex(arr) {
  return elliptic.utils.toHex(arr).toUpperCase();
}
function fromHex(hex) {
  return elliptic.utils.toArray(hex, "hex");
}

// Sign message (must be an array, or it'll be treated as a hex sequence)
function codifyMessage(message) {
  return message.split("").map((m) => m.charCodeAt(0));
}

const generateKey = (length = 32) => {
  let secret;
  let key;

  if (
    typeof window !== "undefined" &&
    window.crypto &&
    window.crypto.getRandomValues
  ) {
    secret = new Uint8Array(length);
    window.crypto.getRandomValues(secret);
  } else {
    console.warn("Warning: Using insecure methods to generate private key");
    secret = [];
    for (let i = 0; i < length; i++) {
      secret.push(Math.random() * 9007199254740991); // aka Number.MAX_SAFE_INTEGER ~9 quadrillion
    }
  }

  key = ec.keyFromSecret(fromHex(toHex(secret)));

  return {
    publicKey: toHex(key.getPublic()),
    privateKey: toHex(key.getSecret()),
  };
};

const signMessage = (message, privateKey) => {
  if (message && privateKey) {
    const key = ec.keyFromSecret(privateKey);
    return key.sign(codifyMessage(message)).toHex();
  }

  return null;
};

const verifyMessage = (message, signature, publicKey) => {
  if (message && signature && publicKey) {
    const key = ec.keyFromPublic(publicKey, "hex");
    return key.verify(codifyMessage(message), signature);
  }

  return null;
};

module.exports = { generateKey, signMessage, verifyMessage };
