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
  return new Promise((resolve, reject) => {
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

    let publicKey = toHex(key.getPublic());
    let privateKey = toHex(key.getSecret());

    resolve({ publicKey, privateKey });
  });
};

const signMessage = (message, privateKey) => {
  if (message && privateKey) {
    return new Promise((resolve, reject) => {
      const key = ec.keyFromSecret(privateKey);
      const signature = key.sign(codifyMessage(message)).toHex();
      resolve(signature);
    });
  }

  return null;
};

const verifyMessage = (message, signature, publicKey) => {
  if (message && signature && publicKey) {
    return new Promise((resolve, reject) => {
      const key = ec.keyFromPublic(publicKey, "hex");
      const verify = key.verify(codifyMessage(message), signature);
      resolve(verify);
    });
  }

  return null;
};

const privateToPublic = (privateKey) => {
  if (privateKey) {
    return new Promise((resolve, reject) => {
      const key = ec.keyFromSecret(privateKey);
      const publicKey = toHex(key.getPublic());
      resolve(publicKey);
    });
  }

  return null;
};

module.exports = { generateKey, signMessage, verifyMessage, privateToPublic };
