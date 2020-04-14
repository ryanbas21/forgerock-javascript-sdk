// Patches Promise, URL, Object.assign, Array methods and more ...
import 'core-js/stable';
// Patches missing native generator feature
import 'regenerator-runtime/runtime';
// Patches missing native fetch feature
import 'whatwg-fetch';
// Patches missing native TextEncoder and TextDecoder
import 'fast-text-encoding';

// Patch el.remove() method
// This fixes the iframe removal error
if (!Element.prototype.remove) {
  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  };
}

// Patch missing crypto library
if (!window.crypto && window.msCrypto) {
  // Cache the legacy `digest` API from `msCrypto`
  const legacyDigest = window.msCrypto.subtle.digest;
  // Delete the property to prevent a circular reference
  delete window.msCrypto.subtle.digest;

  // Wrap the cached digest method in a Promise
  const modernDigest = (type, array) => {
    return new Promise((resolve, reject) => {
      // Use `call` here to ensure the proper `this` binding
      const cryptoObj = legacyDigest.call(window.msCrypto.subtle, type, array);

      // The legacy `digest` method used an event based API, rather than `Promise`
      // called `CryptoOperation`. You can find more about it here:
      // https://msdn.microsoft.com/en-us/windows/dn280996(v=vs.71)
      cryptoObj.onerror = (err) => {
        reject('Crypto operation `digest` failed.');
      };
      cryptoObj.oncomplete = (evt) => {
        const result = evt.target.result;
        resolve(result);
      };
    });
  };

  // Have the modern `window.crypto` point to the `msCrypto` library
  window.crypto = window.msCrypto;
  // Assign the newly wrapped `digest` method to the original `digest` property
  window.crypto.subtle.digest = modernDigest;
}

const un = '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629';
const pw = 'Password1!';
const resourceUrl = 'https://forgerock-sdk-samples.com:3001/account';
console.log('Configure the SDK');
forgerock.Config.set({
  clientId: 'AccountHolderOAuth2',
  redirectUri: 'https://forgerock-sdk-samples.com:3002/callback',
  realmPath: 'root',
  scope: 'openid profile me.read',
  tree: 'LoginWithDeviceProfile',
  serverConfig: {
    baseUrl: 'https://forgerock-sdk-samples.com:3001/am',
  },
});

(async function() {
  console.log('Initiate first step with `undefined`');
  let step = await forgerock.FRAuth.next();

  console.log('Set values on auth tree callbacks');
  step.getCallbackOfType('ValidatedCreateUsernameCallback').setName(un);
  step.getCallbackOfType('ValidatedCreatePasswordCallback').setPassword(pw);
  step = await forgerock.FRAuth.next(step);

  const deviceCollectorCb = step.getCallbackOfType('DeviceProfileCallback');

  const message = deviceCollectorCb.getMessage();
  console.log(message);
  document.body.innerHTML = `<p class="profileStatus">${message}</p>`;
  const isLocationRequired = deviceCollectorCb.isLocationRequired();
  const isMetadataRequired = deviceCollectorCb.isMetadataRequired();

  const device = new forgerock.FRDevice();
  const profile = await device.getProfile({
    location: isLocationRequired,
    metadata: isMetadataRequired,
  });

  console.log('Profile collected.');
  console.log(JSON.stringify(profile));
  step.getCallbackOfType('DeviceProfileCallback').setProfile(profile);
  step = await forgerock.FRAuth.next(step);

  if (!step.payload.code) {
    console.log('Auth tree successfully completed');
  } else {
    throw new Error('Auth_Error');
  }

  console.log('Get OAuth tokens');
  let tokens = await forgerock.TokenManager.getTokens({ forceRenew: true });

  if (step.getSessionToken()) {
    console.log('OAuth login successful');
    document.body.innerHTML = '<p class="Logged_In">Login successful</p>';
  } else {
    throw new Error('Token_Error');
  }

  console.log('Get user info from OAuth endpoint');
  const user = await forgerock.UserManager.getCurrentUser();

  console.log('User given name: ' + user.family_name);

  // console.log('Make a $200 withdrawal from account');
  // const response = await forgerock.HttpClient.request({
  //   init: {
  //     method: 'POST',
  //     body: JSON.stringify({ amount: '200' }),
  //   },
  //   txnAuth: {
  //     handleStep: async function(step) {
  //       console.log('Withdraw action requires additional authorization');
  //       step.getCallbackOfType('ValidatedCreateUsernameCallback').setName(un);
  //       step.getCallbackOfType('ValidatedCreatePasswordCallback').setPassword(pw);
  //       return Promise.resolve(step);
  //     },
  //   },
  //   timeout: 0,
  //   url: `${resourceUrl}/withdraw`,
  // });

  // if (response.ok) {
  //   console.log('Withdrawal of $200 was successful');
  //   const body = await response.json();
  //   console.log(`Balance is ${body.balance}`);
  // } else {
  //   console.log('Withdraw authorization failed');
  // }

  console.log('Initiate logout');
  await forgerock.FRUser.logout();

  tokens = await forgerock.TokenStorage.get();

  if (!tokens) {
    console.log('Logout successful');
    document.body.innerHTML = '<p class="Logged_Out">Logout successful</p>';
  } else {
    throw new Error('Logout_Error');
  }

  console.log('Test script complete');
})();
