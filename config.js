const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");

// Read environment variables from "testenv". Override environment vars if they are already set. https://www.npmjs.com/package/dotenv
const ENVFILE = path.resolve(__dirname, "testenv");

if (process.env.ENV == "prod") {
  const ENVFILE = path.resolve(__dirname, "prodenv");
}
if (fs.existsSync(ENVFILE)) {
  const envConfig = dotenv.parse(fs.readFileSync(ENVFILE));
  Object.keys(envConfig).forEach((k) => {
    process.env[k] = envConfig[k];
  });
}

var ISSUER =
  process.env.ISSUER || "https://{yourOktaDomain}.com/oauth2/default";
var CLIENT_ID = process.env.CLIENT_ID || "{clientId}";
var CLIENT_SECRET = process.env.CLIENT_SECRET || "{clientSecret}";
var OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK
  ? true
  : false;
var REDIRECT_URI = process.env.REDIRECT_URI || "";

module.exports = {
  webServer: {
    port: 8081,
    oidc: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      issuer: ISSUER,
      appBaseUrl: REDIRECT_URI,
      scope: "openid profile email",
      testing: {
        disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
      },
    },
  },
  // resourceServer: {
  //   port: 8000,
  //   oidc: {
  //     clientId: SPA_CLIENT_ID,
  //     issuer: ISSUER,
  //     testing: {
  //       disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  //     },
  //   },
  //   assertClaims: {
  //     aud: "api://default",
  //     cid: SPA_CLIENT_ID,
  //   },
  // },
};
