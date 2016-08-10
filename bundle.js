/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";
	var AuthenticationProvider = (function () {
	    function AuthenticationProvider() {
	        var _this = this;
	        this.setPublicKey = function (key) {
	            _this.publicKey = key;
	            return _this.publicKey;
	        };
	        this.setSecretKey = function (key) {
	            _this.privateKey = key;
	            return _this.privateKey;
	        };
	        this.getKey = function () {
	            return _this.publicKey;
	        };
	        this.getSecret = function () {
	            return _this.privateKey;
	        };
	    }
	    AuthenticationProvider.prototype.$get = function () {
	        return new AuthenticationProvider;
	    };
	    AuthenticationProvider.$inject = [];
	    return AuthenticationProvider;
	}());
	exports.AuthenticationProvider = AuthenticationProvider;
	var AuthenticationInterceptor = (function () {
	    function AuthenticationInterceptor($q, $location, $injector, AuthConfig) {
	        var _this = this;
	        this.$q = $q;
	        this.$location = $location;
	        this.$injector = $injector;
	        this.request = function (req) {
	            if (req.skipAuthorization)
	                return req;
	            req.headers = req.headers || {};
	            if (req.headers[_this.authKeyHeader])
	                return req;
	            var timestamp = moment().format('MM/DD/YYYY hh:mm:ss A');
	            var hashedSig;
	            req.headers[_this.tsHeader] = timestamp;
	            req.headers[_this.authKeyHeader] = _this.publicKey;
	            var shaObj = new jsSHA('SHA-256', "TEXT");
	            shaObj.setHMACKey(_this.privateKey, "TEXT");
	            shaObj.update(timestamp + '\n' + req.method + '\n' + req.url.substr(req.url.indexOf('/')));
	            req.headers[_this.authSigHeader] = shaObj.getHMAC("HEX");
	            return req;
	        };
	        this.requestError = function (requestError) { };
	        this.response = function (response) { };
	        this.responseError = function (responseError) { };
	        this.tsHeader = 'Timestamp';
	        this.authKeyHeader = 'Authentication-Key';
	        this.authSigHeader = 'Authentication-Signature';
	        this.authHeader = 'Authorization';
	        this.publicKey = AuthConfig.getKey();
	        this.privateKey = AuthConfig.getSecret();
	    }
	    AuthenticationInterceptor.Factory = function ($q, $location, $injector, AuthConfig) {
	        return new AuthenticationInterceptor($q, $location, $injector, AuthConfig);
	    };
	    AuthenticationInterceptor.$inject = ['$q', '$location', '$injector', 'authenticationProvider'];
	    return AuthenticationInterceptor;
	}());
	exports.AuthenticationInterceptor = AuthenticationInterceptor;
	angular.module('ngTurboAppeal', [])
	    .provider('authenticationProvider', AuthenticationProvider)
	    .factory('authenticationFactory', ['$q', '$location', '$injector', 'authenticationProvider', AuthenticationInterceptor.Factory]);


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map