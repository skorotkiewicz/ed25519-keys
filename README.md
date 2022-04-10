# ed25519-keys

> npm package provide ed25519 key generation, signing and verification

## Install

```sh
$ npm install ed25519-keys
// or
$ yarn add ed25519-keys
```

## Import

```javascript
const { generateKey, signMessage, verifyMessage } = require("ed25519-keys");
```

## Usage

Generate Key

> generateKey(<key_length>); default `key_length` is `32`

```javascript
const key = generateKey(5);

console.log(key);
// output:
// {
//   publicKey: '10E5DFEA8A0B47C2B4F339DEB3EE0B013EA0FFDB235E2BD33D8DBF066D96A1CE',
//   privateKey: '134C127A7CDBADB4D9CF503D013812B83795736A2F74E8BFD7658C5CF6EA23530294D8'
// }
```

Sign message

```javascript
const signature = signMessage(message, privateKey);
console.log("signature:", signature);

// output:
// signature: 23BD541CDDC296183511453EB70CAD2BD674507D7D087CDC7FD69B19BAC8149FB09F7E9EF1AFFD34EC425FC3FD7C2E86E6E5B2AD73419156987A9836BC50CB0B
```

Verify message

```javascript
const verify = verifyMessage(message, signature, publicKey);
console.log("match:", verify);

// output "true" if match else "false":
// match: true
```

## Example in React

```javascript
import { generateKey } from "ed25519-keys";

const App = () => {
  const key = generateKey(32);

  return (
    <div>
      <div>PublicKey: {key.publicKey}</div>
      <div>PrivateKey: {key.privateKey}</div>
    </div>
  );
};

export default App;
```
