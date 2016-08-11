# TurboAppeal Angular module

This is the official TurboAppeal angular module to authenticate with the API.

# Installation

To install it via npm:

```
npm i turboappeal-angular --save
```

To install it via bower:

```
bower i turboappeal-angular --save
```


# Usage

In your angular application, first add 'turboappealApi' as a dependancy

```
angular.module('myApp', ['turboappealApi']);
```

After that, you have to configure the interceptor and add it to your httpProvider as follows:

```
angular.module('myApp', ['turboappealApi'])
.config(
function($httpProvider, turboappealProvider){

	// Set your application keys provided by TurboAppeal
	turboappealProvider.setPublicKey('YOUR_PUBLIC_KEY');
	turboappealProvider.setSecretKey('YOUR_SECRET_KEY');

	// Setup turboappeal as a provider
	$httpProvider.interceptors.push('turboappealSignature');
});
```
And you're done! Any request made to turboappeal will be handle by this module to ensure our protocols of security.

# Developing:

## Necessary tools:
 - [Node.js](https://nodejs.org/en/download/) v4.4.7 or higher to run.
 - [Git for Windows](https://git-scm.com/download/win)
 - Webpack

## Instructions to build

If you don't have webpack in most cases you'd want to install it globally (due to permissions depending on OS):

```
npm i webpack -g
```


### First run

```
npm install
```

After that is done it will also run typings install (from the just downloaded dependency) If you want to start developing run:

```
npm start
```

### Running distribution

```
webpack
```