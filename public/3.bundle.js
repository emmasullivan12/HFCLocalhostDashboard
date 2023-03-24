(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./public/components/AccessControl.js":
/*!********************************************!*\
  !*** ./public/components/AccessControl.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n// Dex last merged this code on 22nd mar 2023\n\n\nvar checkPermissions = function checkPermissions(userPermissions, allowedPermissions) {\n  if (allowedPermissions.length === 0) {\n    return true;\n  }\n\n  return userPermissions.some(function (permission) {\n    return allowedPermissions.includes(permission);\n  });\n};\n\nvar AccessControl = function AccessControl(_ref) {\n  var requireLogin = _ref.requireLogin,\n      allowedPermissions = _ref.allowedPermissions,\n      children = _ref.children,\n      renderNoAccess = _ref.renderNoAccess;\n  var userPermissions = [\"maxViewsReached\"]; //To be linked to Redux\n\n  var isLoggedIn = false; //To be linked to Redux\n\n  var permitted = (requireLogin ? isLoggedIn : true) && checkPermissions(userPermissions, allowedPermissions);\n\n  if (permitted) {\n    return children;\n  } else {\n    return renderNoAccess();\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AccessControl);\n\n//# sourceURL=webpack:///./public/components/AccessControl.js?");

/***/ })

}]);