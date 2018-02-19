<p align="center"><a href="http://plumber-sc.com" target="_blank"><img width="100" src="http://plumber-sc.com/images/logo.png" alt="Plumber for Sitecore Commerce"></a></p>

# Plumber for Sitecore Commerce

Plumber is a configuration viewer for Sitecore Commerce, a bit like `showconfig.aspx` in Sitecore but with built-in search capabilities.

## What do you use it for?

Checking what happens in Sitecore Commerce can sometimes be a bit complicated. This tool will give you insight into how the pipelines are configured, which blocks are used and how the policies are configured per environment.

Plumber is a [Vue](https://vuejs.org/) single page application. Built for production, you can use it with any web server. It doesn't require any server side technology for itself.

## Installing Plumber

This document describes two ways of installing Plumber: as an IIS website or running it in development mode directly from NPM.

### Using IIS

The `dist` folder contains a pre-compiled version of Plumber that you can install as an IIS site.

### In development mode

If you want

## Configuring Plumber

Configuration of Plumber is done in `config.json` located in the `static` directory.

The default config.json looks like this:

```javascript
{
  "EngineUri": "http://localhost:5000",
  "IdentityServerUri": "http://localhost:5050",
  "ClientId": "Plumber",
  "PlumberUri": "http://localhost:8080"
}
```

The following table describes the parameters and their default values.

<table>
<tr>
    <td>Parameter</td><td>Default</td><td>Description</td>
</tr>
<tr>
    <td>EngineUri</td><td>"http://localhost:5000"</td><td>Base uri of the commerce engine</td>
</tr>
<tr>
    <td>IdentityServerUri</td><td>"http://localhost:5050"</td><td>Base uri of the Sitecore Identity Server. Identity Server is used to retrieve a token to connect to Commerce Engine. This means you need a user account to be able to access it.</td>
</tr>
<tr>
    <td>ClientId</td><td>"Plumber"</td><td>Client id used to connect to identity server. See the section on how to configure Identiy Server.</td>
</tr>
<tr>
    <td>PlumberUri</td><td>"http://localhost:8080"</td><td>Base uri of the commerce engine</td>
</tr>
</table>

## Configuring Sitecore Identity Server

Plumber-sc uses Sitecore Identity Server to get an authentication token, used to authenticate against the commerce engine. You need to add plumber-sc as a client in the configuration of Identity Server.

You can find Identity Server's configuration in the `appsettings.json` file in the `wwwroot` folder of Sitecore Identity Server.

Open the file and add the following to the `Clients` section:

```
{
        "ClientId": "Plumber",
        "ClientName": "Plumber",
        "AccessTokenType": 0,
        "AccessTokenLifetimeInSeconds": 3600,
        "IdentityTokenLifetimeInSeconds": 3600,
        "AllowAccessTokensViaBrowser": true,
        "RequireConsent": false,
        "RequireClientSecret": false,
        "AllowedGrantTypes": [
          "implicit"
        ],
        "RedirectUris": [
          "http://localhost:8080",
          "http://localhost:8080/?"
        ],
        "PostLogoutRedirectUris": [
          "http://localhost:8080",
          "http://localhost:8080/?"
        ],
        "AllowedCorsOrigins": [
          "http://localhost:8080/",
          "http://localhost:8080"
        ],
        "AllowedScopes": [
          "openid",
          "dataEventRecords",
          "dataeventrecordsscope",
          "securedFiles",
          "securedfilesscope",
          "role",
          "EngineAPI"
        ]
      },
```

This configuratin sets up Identity Server to allow authentication from clients authenticating with client id `Plumber` coming from `https://localhost:8080`. If you're running plumber-sc on a different port you need to adjust these settings.

## Configuring your commerce engine

There are some small things you need to configure in your commerce engine to so Plumber-sc can access it.

First, you need to add plumber-sc as an allowed origin. Open `config.json` in the `wwwroot` folder of your commerce engine and add the url (by default `http://localhost:8080`) to the `AllowedOrigins` section. It should look something like this: 

```
  "AllowedOrigins": [
      "https://localhost:4200",
      "http://localhost:4200",
      "http://localhost:8080",
      "http://sxa.storefront.com"
  ],
```

Secondly, you need to turn off CSRF validation. In `config.json` change `"AntiForgeryEnabled": true` to `"AntiForgeryEnabled": false`



## Vue Build Setup

If you want to change something in the app, below you will find instructions on how to build the project below. 

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
