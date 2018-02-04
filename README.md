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
    <td>ClientId</td><td>"Plumber"</td><td>Client id used to connect to identity server. </td>
</tr>
<tr>
    <td>PlumberUri</td><td>"http://localhost:8080"</td><td>Base uri of the commerce engine</td>
</tr>
</table>

## Configuring Identity Server

## Vue Build Setup

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
