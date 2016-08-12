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
	        this.$get.$inject = [];
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
	        this.AuthConfig = AuthConfig;
	        this.request = function (req) {
	            _this.publicKey = _this.AuthConfig.getKey();
	            _this.privateKey = _this.AuthConfig.getSecret();
	            if (req.skipAuthorization || req.url.indexOf('.turboappeal.com/') == -1)
	                return req;
	            req.headers = req.headers || {};
	            if (req.headers[_this.authKeyHeader] || !_this.privateKey || !_this.publicKey)
	                return req;
	            var timestamp = moment().format('MM/DD/YYYY hh:mm:ss A');
	            var hashedSig;
	            req.headers[_this.tsHeader] = timestamp;
	            req.headers[_this.authKeyHeader] = _this.publicKey;
	            var shaObj = CryptoJS.HmacSHA256(timestamp + '\n' + req.method + '\n' + req.url.substr(req.url.indexOf('/')), _this.privateKey);
	            req.headers[_this.authSigHeader] = shaObj.toString();
	            return req;
	        };
	        this.requestError = function (requestError) {
	            return requestError;
	        };
	        this.response = function (response) {
	            return response;
	        };
	        this.responseError = function (responseError) {
	            return responseError;
	        };
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
	    AuthenticationInterceptor.$inject = ['$q', '$location', '$injector', 'turboappealProvider'];
	    return AuthenticationInterceptor;
	}());
	exports.AuthenticationInterceptor = AuthenticationInterceptor;
	angular.module('turboappealApi', [])
	    .provider('turboappealProvider', AuthenticationProvider)
	    .factory('turboappealSignature', ['$q', '$location', '$injector', 'turboappealProvider', AuthenticationInterceptor.Factory]);


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map